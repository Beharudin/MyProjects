import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "./Room";
import Loader from "../components/loader/Loader";
import Error from "../components/error/Error";
import { DatePicker, Space } from "antd";
import "antd/dist/reset.css";
import moment from "moment";

const { RangePicker } = DatePicker;

function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get("/rooms/getallrooms")).data;
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function filterByDate(dates) {
    setFromDate(moment(dates[0].toString()).format("DD-MM-YYYY"));
    setToDate(moment(dates[1].toString()).format("DD-MM-YYYY"));

    var availabilty = false;
    var temprooms = [];
    for (const room of duplicateRooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0].toString()).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1].toString()).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0].toString()).format("DD-MM-YYYY") !==
                booking.fromdate &&
              moment(dates[0].toString()).format("DD-MM-YYYY") !==
                booking.todate &&
              moment(dates[1].toString()).format("DD-MM-YYYY") !==
                booking.fromdate &&
              moment(dates[1].toString()).format("DD-MM-YYYY") !==
                booking.todate
            ) {
              availabilty = true;
            }
          }
        }
      }
      if (availabilty == true || room.currentbookings.length == 0) {
        temprooms.push(room);
      }
      setRooms(temprooms);
    }
  }
  const filterBySearch=()=>{
    const temprooms=duplicateRooms.filter(room=>room.name.toLowerCase().includes(searchKey.toLowerCase()));
    setRooms(temprooms);
  }

  const filterByType=(e)=>{
    setType(e);
    if(e!=='all'){
      const temprooms=duplicateRooms.filter(room=>room.type.toLowerCase()===e.toLowerCase());
      setRooms(temprooms);
    }else{
      setRooms(duplicateRooms);
    } 
  }

  return (
    <div className="container">
      {!(loading || error) && (
        <div className="row bs mt-5 top">
          <div className="col-md-3">
            <Space direction="vertical" size={12}>
              <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
            </Space>
          </div>
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Search"
            value={searchKey} onChange={e=>setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
            />
          </div>
          <div className="col-md-3">
          <select className="form-control" value={type} onChange={e=>filterByType(e.target.value)
          }>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
          </div>
        </div>
      )}
      <div className="row justify-content-center">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9" key={room.id}>
                <Room room={room} fromdate={fromDate} todate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomePage;
