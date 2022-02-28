const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://endri:Goldenape%21%40%23@cluster0.k3d1e.mongodb.net/eliterentalcar",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Mongo DB Connection Successfull");
  });
  connection.on("error", (error) => {
    console.log("Mongo DB Connection ERROR ");
    console.log(error);
  });
}

connectDB();
module.exports = mongoose;

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require("./db");

app.use(express.json());
app.use("/api/cars/", require("./routes/carsRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));

const path = require("path");

if (process.env.PORT === "production" || 5000) {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Node JS Server Started at port : ${port}!`)
);
