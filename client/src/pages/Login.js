import React from "react";
import { Row, Col, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  function onFinish(values) {
    dispatch(userLogin(values));
  }

  return (
    <div className="login">
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            src="https://wallpaperaccess.com/full/2492629.jpg"
            alt="black car"
          />
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <button className="btn1">Login</button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
