const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");

router.post("/bookcar", async (req, res) => {
  var test;
  try {
    const newbooking = new Booking(req.body);
    await newbooking.save((err, room) => {
      if (err) return `Error saving the new booking${err}`;
      let { _id } = room;
      test = _id;
      console.log(`New Room id: ${test}`);
      return room;
    });
    const car = await Car.findOne({ _id: req.body.car });
    var mongoose = require("mongoose");

    car.bookedTimeSlots.push({
      _id: new mongoose.Types.ObjectId(test),
      from: req.body.bookedTimeSlots.from,
      to: req.body.bookedTimeSlots.to,
    });
    await car.save();
    res.send("Your booking is successfull");
  } catch (error) {
    console.log("Tgus errir", error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletebooking", async (req, res) => {
  try {
    // const car = await Car.findById({ _id: req.body.car });
    // console.log(` Car id: ${car}`);
    // car.bookedTimeSlots.filter((el) => el._id !== req.body.bookid);
    await Car.findOneAndUpdate(
      { _id: req.body.car },
      { $pull: { bookedTimeSlots: { _id: req.body.bookid } } },
      { safe: true, multi: false }
    );
    await Booking.findOneAndDelete({ _id: req.body.bookid });
    return res.status(200).json({ message: "Album Deleted Successfully" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
