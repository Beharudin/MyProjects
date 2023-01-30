const express = require("express");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51MQr1mAZsOgOJZ7HGuxivszpvZF4Opqhq6qX2RwSZ4YQSacEMLbV9L51Mi1skEpewIhABNXAB183nSOGzh0wu8Jh008K22t7R6"
);
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromDate, toDate, totalAmount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: "ETB",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const newBooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: moment(fromDate).format("DD-MM-YYYY"),
        todate: moment(toDate).format("DD-MM-YYYY"),
        totalamount: totalAmount,
        totaldays,
        transactionId: "123456789",
      });
      const booking = await newBooking.save();
      const temproom = await Room.findOne({ _id: room._id });
      temproom.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromDate).format("DD-MM-YYYY"),
        todate: moment(toDate).format("DD-MM-YYYY"),
        userid: userid,
        status: booking.status,
      });
      await temproom.save();
    }
    res.send("Payment successfull, Your Room is booked!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const userid=req.body.userid;

  try {
    const bookings=await Booking.find({userid: userid});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const {bookingid, roomid}=req.body;

  try {
    const bookingItem=await Booking.findOne({_id: bookingid});
    bookingItem.status= 'cancelled';
    await bookingItem.save();

    const room=await Room.findOne({_id: roomid});
    const bookings=room.currentbookings;

    const temp=await bookings.filter(booking=>booking.bookingid.toString()!==bookingid);
    room.currentbookings=temp;
    await room.save();
    res.send('Your booking cancelled successfully!');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings=await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
