import React from "react";
import { Col, Row, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addCar } from "../redux/actions/carsAction";

function AddCarForm() {
  const dispatch = useDispatch();

  function onFinish(values) {
    values.bookedTimeSlots = [];
    dispatch(addCar(values));
    console.log(values);
  }
  return (
    <>
      <Row justify="center ">
        <Col lg={12} sm={24}>
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h1>Add A New Car</h1>
            <Form.Item
              name="name"
              label="Car Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="secImage"
              label="Second Image URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rentPerHour"
              label="Price"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="capacity"
              label="Capacity"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="air"
              label="Air-Condition(yes/no)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gear"
              label="Gear(Automatic/Manual)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="fuelType"
              label="Fuel Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <button className="btn1">Add Car</button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default AddCarForm;
