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
