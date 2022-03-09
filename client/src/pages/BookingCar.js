import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import { getAllCars } from "../redux/actions/carsAction";
import { bookCar } from "../redux/actions/bookingActions";

import { Button, DatePicker } from "antd";
import { Modal, Form, Input, Checkbox } from "antd";

import "./BookingCar.css";
import { set } from "mongoose";
import emailjs, { init } from "@emailjs/browser";

function BookingCar() {
  let { carid } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const [car, setCar] = useState({});
  const { RangePicker } = DatePicker;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const lang = localStorage.getItem("lang");
  const [price, setPrice] = useState(1);

  init("user_P2T9QOMCokERgI4RSoMRJ");
  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars]);

  function selectTimeSlots(values) {
    const from = values[0];
    const to = values[1];

    if (to.diff(from, "days") <= 1) {
      alert(
        lang === "sq"
          ? "Minimumi per rezervim eshte 3 dit"
          : "Minimum for reservation is 3 days"
      );
      window.location.reload();
    }
    if (
      from > moment(`6/24/${from.year()}`, "M/D/YYYY") &&
      from < moment(`9/6/${from.year()}`, "M/D/YYYY")
    ) {
      setFrom(moment(values[0]).format("MMMM Do YYYY"));
      setTo(moment(values[1]).format("MMMM Do YYYY"));
      setTotalDays(values[1].diff(values[0], "days"));
      setPrice(1.6);
      showModal();
    } else {
      setFrom(moment(values[0]).format("MMMM Do YYYY"));
      setTo(moment(values[1]).format("MMMM Do YYYY"));
      setTotalDays(values[1].diff(values[0], "days"));
      showModal();
    }
  }

  const showModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    setTotalAmount(totalDays * car.rentPerHour * price);
  }, [totalDays, totalAmount]);

  const handleOk = (values) => {
    const reqObj = {
      car: car._id,
      userName: values.name,
      userPhone: values.phone,
      userEmail: values.email,
      totalDays,
      totalAmount,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
    emailjs
      .send("service_mn0bez5", "template_1nevlr4", {
        car: car.name,
        userName: reqObj.userName,
        userPhone: reqObj.userPhone,
        userEmail: reqObj.userEmail,
        from: reqObj.bookedTimeSlots.from,
        to: reqObj.bookedTimeSlots.to,
        totalDays,
        totalAmount,
      })
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setIsModalVisible(false);
  };

  var getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };
  var daylist = [];

  useEffect(() => {
    try {
      car.bookedTimeSlots.forEach((element) => {
        daylist.push(
          ...getDaysArray(
            new Date(moment(element.from, "MMMM Do YYYY").format("YYYY-MM-DD")),
            new Date(moment(element.to, "MMMM Do YYYY").format("YYYY-MM-DD"))
          )
        );
      });
      daylist.map((v) => v.toISOString().slice(0, 10)).join("");
    } catch (error) {
      console.log(error);
    }
  }, [car]);
  function disabledDate(current) {
    for (let i = 0; i < daylist.length; i++) {
      if (
        current.date() === moment(daylist[i]).date() &&
        current.month() === moment(daylist[i]).month()
      ) {
        return true;
      }
    }
    return false;
  }
  const handleCancel = () => {
    setIsModalVisible(false);
    window.location.reload();
  };
  return (
    <div className="sector booking">
      <h1> {lang === "sq" ? "Rezervo Makinen" : "Booking Car"}</h1>
      {!loading ? (
        <div className="carCard">
          <img src={car.image} alt="Cars Image" />
          <div className="carInfo">
            <div className="title">
              <h2>{car.name}</h2>
            </div>
            <div className="characteristics">
              <div className="group">
                <i className="fa fa-user" />
                <p>{lang === "sq" ? "Kapaciteti" : "Capacity"}</p>
                <p>{car.capacity}</p>
              </div>
              <div className="group">
                <i className="fas fa-gas-pump" />
                <p>{lang === "sq" ? "Karburant" : "Fuel type:"} </p>
                <p>{car.fuelType}</p>
              </div>
              <div className="group">
                <i className="fas fa-tachometer-alt" />
                <p>Manual/Automatic:</p>
                <p>{car.gear}</p>
              </div>
              <div className="group">
                <i className="fas fa-snowflake" />
                <p>Air-Conditioning:</p>
                <p>{car.air}</p>
              </div>
              <div className="group">
                <i className="fas fa-coins" />
                <p>{lang === "sq" ? "Cmimi" : "Price"}</p>
                <p>{car.rentPerHour} €/day</p>
              </div>
            </div>
            <RangePicker
              format="MMMM Do YYYY"
              onChange={selectTimeSlots}
              disabledDate={(current) => disabledDate(current)}
            />
            <h5>
              {lang === "sq" ? "Ditet Totale :" : "Total Days :"} {totalDays}
            </h5>
            <h4>
              {lang === "sq" ? "Cmimi Total: " : "Total Price:"} {totalAmount} €
            </h4>
            <Modal
              title="Reserve Information"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
            >
              <Form layout="vertical" className="" onFinish={handleOk}>
                <h1>
                  {lang === "sq" ? "Formulari Rezervimit" : "Reservation Form"}
                </h1>
                <Form.Item
                  name="name"
                  label={lang === "sq" ? "Emer Mbiemer" : "Name Surname"}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                ></Form.Item>
                <Form.Item name="price">
                  <h4>Total Days : {totalDays}</h4>
                  <h4>Total Amount : {totalAmount} €</h4>
                </Form.Item>
                <button className="reserve-btn">Reserve</button>
              </Form>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="center">
          <h1>Loading...</h1>
          <img src="/loader.gif" alt="the car loader" />
        </div>
      )}
    </div>
  );
}

export default BookingCar;
