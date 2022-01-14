import React, { useState, useEffect } from "react";
import "./MyForm.css";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

function MyForm() {
  const navigate = useNavigate();
  const { cars } = useSelector((state) => state.carsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);
  function handleDates(values) {
    var selectedFrom = moment(values[0], "MMMM Do YYYY");
    var selectedTo = moment(values[1], "MMMM Do YYYY");

    var temp = [];
    for (var car of cars) {
      let cnt = 0;

      if (car.bookedTimeSlots.length === 0) {
        if (!temp.includes(car)) {
          temp.push(car);
        }
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(
              moment(booking.from, "MMMM Do YYYY"),
              moment(booking.to, "MMMM Do YYYY")
            ) ||
            selectedTo.isBetween(
              moment(booking.from, "MMMM Do YYYY"),
              moment(booking.to, "MMMM Do YYYY")
            ) ||
            moment(booking.from, "MMMM Do YYYY").isBetween(
              selectedFrom,
              selectedTo
            ) ||
            moment(booking.to, "MMMM Do YYYY").isBetween(
              selectedFrom,
              selectedTo
            )
          ) {
            cnt = cnt + 1;
          }
        }
        if (!temp.includes(car) && cnt === 0) {
          temp.push(car);
        }
      }
    }

    setTotalCars(temp);
  }
  function searchCar() {
    navigate(`/searched`, {
      state: {
        totalCars,
      },
    });
  }
  return (
    <div className="form-container">
      <h2>Elite Rental Cars</h2>
      <form>
        <div className="form__inputs">
          <div className="input-icons">
            <RangePicker onChange={handleDates} />
          </div>
        </div>
        <button className="available__link" onClick={searchCar}>
          Check For Cars!
        </button>
      </form>
    </div>
  );
}

export default MyForm;
