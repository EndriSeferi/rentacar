const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectID, ref: "cars" },
  userName: {type: String},
  userPhone: {type:Number},
  userEmail: {type: String},
  bookedTimeSlots: {
    from: { type: String },
    to: { type: String },
  },
  totalDays: { type: Number },
  totalAmount: { type: Number },
});

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
