import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Loader from "../components/loader/Loader";
import Swal from "sweetalert2";
import { Tag } from 'antd';
import "./pages.css";

const { TabPane } = Tabs;

function Profile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <b>
            <p>Name: {user.name}</p>
            <p>email: {user.email}</p>
            <p>IsAdmin: {user.isAdmin ? "Yes" : "No"}</p>
          </b>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;

export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await (
          await axios.post("/booking/getbookingbyuserid", { userid: user._id })
        ).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, []);

  async function cacelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = await (
        await axios.post("/booking/cancelbooking", { bookingid, roomid })
      ).data;
      Swal.fire(
        "Congratulations!",
        "Your booking has been cancelled!",
        "success"
      ).then((res) => {
        window.location.reload();
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire(
        "Oops!",
        "Something went wrong!",
        "error"
      )
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <p>
                    <b>{booking.room}</b>
                  </p>
                  <p>
                    <b>BookingId: </b>
                    {booking._id}
                  </p>
                  <p>
                    <b>Check In: </b>
                    {booking.fromdate}
                  </p>
                  <p>
                    <b>Check Out: </b>
                    {booking.todate}
                  </p>
                  <p>
                    <b>Amount: </b>
                    {booking.totalamount}
                  </p>
                  <p>
                    <b>Status: </b>
                    {booking.status == "booked" ?<Tag color="green">CONFIRMED</Tag> : <Tag color="red">CANCELLED</Tag>}
                  </p>

                  <div className="text-right">
                    {booking.status == "booked" ? (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          cacelBooking(booking._id, booking.roomid)
                        }
                      >
                        CANCEL BOOKING
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
