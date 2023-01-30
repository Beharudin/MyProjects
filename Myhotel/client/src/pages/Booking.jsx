import axios from "axios";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import Error from "../components/error/Error";
import Loader from "../components/loader/Loader";
import "./pages.css";

function Booking() {
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { roomid } = useParams();
  const location = useLocation();
  const { fromdate, todate } = location.state;
  const [totalAmount, setTotalAmount] = useState();

  const fromDate = moment(fromdate, "DD-MM-YYYY");
  const toDate = moment(todate, "DD-MM-YYYY");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const totaldays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

  useEffect(() => {
    if(!localStorage.getItem('currentUser')){
      window.location.reload='/login'
    }
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.post("/rooms/getroombyid", { roomid })).data;
        setTotalAmount(data.rentperday * totaldays);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, []);

  async function onToken(token) {
    const bookingDetails = {
      room,
      userid: user._id,
      fromDate,
      toDate,
      totalAmount,
      totaldays,
      token,
    };

    try {
      setLoading(true);
      const data = (await axios.post("/booking/bookroom", bookingDetails)).data;
      setLoading(false);
      Swal.fire(
        'Congratulations!', 'Your Room booked successfully!','success'
      ).then(res=>{
        window.location.href='/bookings'
      })
    } catch (error) {
      setLoading(false);
      Swal.fire(
        'Sorry!', 'Something went wrong!','error'
      )
    }
  }
  return (
    <div className="m-5 top">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center bs">
            <div className="col-md-6">
              <p>{room.name}</p>
              <img src={room.imageurls[0]} alt="Hotel" className="bigImg" />
            </div>
            <div className="col-md-6">
              <div>
                <h1>Booking Details</h1>
                <br />
                <b>
                  <p>Name: {user.name}</p>
                  <p>From date: {fromdate}</p>
                  <p>To date: {todate}</p>
                  <p>Max count: {room.maxcount}</p>
                </b>
              </div>
              <div>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days: {totaldays}</p>
                  <p>rent per day: {room.rentperday}</p>
                  <p>Total Amount: {totalAmount}</p>
                </b>
              </div>
              <div>
                <StripeCheckout
                  amount={totalAmount * 100}
                  currency="ETB"
                  token={onToken}
                  stripeKey="pk_test_51MQr1mAZsOgOJZ7HjLfMwSvmNtbny1IvfmkyifKgnGtiYNYCRfY95ztw5I2RTdpp0cDuH7G6Bj0tJfB4tXQ2VrXf000iSwK1wm"
                >
                  <button
                    className="btn btn-primary float-end"
                  >
                    Pay Now
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )}
    </div>
  );
}

export default Booking;
