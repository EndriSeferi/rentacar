import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { getAllCars } from "../redux/actions/carsAction";
import { bookCar } from "../redux/actions/bookingActions";

import { Button, DatePicker } from "antd";
import { Modal, Form, Input } from "antd";

import "./BookingCar.css";

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
  const [totalAmount, setTotalAmount] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMMM Do YYYY"));
    setTo(moment(values[1]).format("MMMM Do YYYY"));
    setTotalDays(values[1].diff(values[0], "days"));
    setTotalAmount(totalDays * car.rentPerHour);

    showModal();
  }

  const showModal = () => {
    setIsModalVisible(true);
  };
 useEffect(() => {
    setTotalAmount(totalDays * car.rentPerHour);
  }, [ totalDays]);
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
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="sector booking">
      <h1>Booking Car</h1>
      {!loading ? (
        <div className="carCard">
          <img src={car.image} alt="Cars Image" />
          <div className="carInfo">
            <div className="title">
              <h2>{car.name}</h2>
              <h5>Car Model</h5>
            </div>
            <div className="characteristics">
              <div className="group">
                <i className="fa fa-user" />
                <p>Capacity: </p>
                <p>{car.capacity}</p>
              </div>
              <div className="group">
                <i className="fas fa-gas-pump" />
                <p>Fuel Type: </p>
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
                <p>Price: </p>
                <p>{car.rentPerHour} $/day</p>
              </div>
            </div>
            <RangePicker format="MMMM Do YYYY" onChange={selectTimeSlots} />
            <h5>Total Days: {totalDays}</h5>
            <h4>Total Price: {totalDays * car.rentPerHour} $</h4>
            <Modal
              title="Reserve Information"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
            >
              <Form layout="vertical" className="" onFinish={handleOk}>
                <h1>Reservation Form</h1>
                <Form.Item
                  name="name"
                  label="Name and Surname"
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
