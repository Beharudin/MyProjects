import { Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import Swal from 'sweetalert2'

const { TabPane } = Tabs;

function AdminPage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user.isAdmin) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <div className="top ml-3 mr-3 bs fixed top">
      <h4 className="text-center">Admin Panel</h4>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Booking" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Addd rooms" key="3">
          <CreateRoom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminPage;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await (await axios.get("/booking/getallbookings")).data;
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
  return (
    <div className="row">
      <div className="col-md-12">
        <h4>Booking</h4>
        {loading ? (
          <Loader />
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Booking Id</th>
                <th>User Id</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length &&
                bookings.map((booking) => {
                  return (
                    <tr>
                      <td>{booking._id}</td>
                      <td>{booking.userid}</td>
                      <td>{booking.room}</td>
                      <td>{booking.fromdate}</td>
                      <td>{booking.todate}</td>
                      <td>{booking.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await (await axios.get("/rooms/getallrooms")).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h4>Rooms</h4>
        {loading ? (
          <Loader />
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per Day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length &&
                rooms.map((room) => {
                  return (
                    <tr>
                      <td>{room._id}</td>
                      <td>{room.name}</td>
                      <td>{room.type}</td>
                      <td>{room.rentperday}</td>
                      <td>{room.maxcount}</td>
                      <td>{room.phonenumber}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await (await axios.get("/users/getallusers")).data;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h4>Users</h4>
        {loading ? (
          <Loader />
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>IsAdmin</th>
              </tr>
            </thead>
            <tbody>
              {users.length &&
                users.map((user) => {
                  return (
                    <tr>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "Yes" : "No"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function CreateRoom() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [rentperday, setRentperday] = useState("");
  const [maxcount, setMaxcount] = useState("");
  const [description, setDescription] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [type, setType] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

  async function addRoom() {
    const newRoom = {
      name,
      maxcount,
      phonenumber,
      rentperday,
      imageurls: [img1, img2, img3],
      type,
      description,
    };
    try {
      setLoading(true);
      const data = (await axios.post("/rooms/addroom", newRoom)).data;
      setLoading(false);
      Swal.fire(
        "Congratulations!",
        "Your Room added successfully!",
        "success"
      ).then((res) => {
        setName("");
        setRentperday("");
        setImg1("");
        setImg2("");
        setImg3("");
        setDescription("");
        setMaxcount("");
        setPhonenumber("");
        setType("");
      });
    } catch (error) {
      setLoading(false);
      setError(true);
      Swal.fire("Sorry!", "Something went wrong!", "error");
    }
  }

  return (
    <div className="row">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="col-md-5">
            <input
              type="text"
              value={name}
              className="form-control"
              placeholder="Room name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              value={rentperday}
              className="form-control"
              placeholder="Rent per day"
              onChange={(e) => setRentperday(e.target.value)}
            />
            <input
              type="text"
              value={maxcount}
              className="form-control"
              placeholder="Max count"
              onChange={(e) => setMaxcount(e.target.value)}
            />
            <input
              type="text"
              value={description}
              className="form-control"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              value={phonenumber}
              className="form-control"
              placeholder="Phone number"
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              value={type}
              className="form-control"
              placeholder="Type"
              onChange={(e) => setType(e.target.value)}
            />
            <input
              type="text"
              value={img1}
              className="form-control"
              placeholder="Image 1 url"
              onChange={(e) => setImg1(e.target.value)}
            />
            <input
              type="text"
              value={img2}
              className="form-control"
              placeholder="Image 2 url"
              onChange={(e) => setImg2(e.target.value)}
            />
            <input
              type="text"
              value={img3}
              className="form-control"
              placeholder="Image 3 url"
              onChange={(e) => setImg3(e.target.value)}
            />
            <div className="text-right">
              <button className="btn btn-primary mt-3" onClick={addRoom}>
                Add Room
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
