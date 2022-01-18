import React, { useState } from "react";
import { Col, Row, Table, Popconfirm, Modal, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteCar, editCar } from "../redux/actions/carsAction";
import { useDispatch } from "react-redux";

function EditCars(props) {
  const temp = [];
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Fuel Type",
      dataIndex: "fuelType",
      key: "fuelType",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Gear",
      dataIndex: "gear",
      key: "gear",
    },
    {
      title: "Air-Condition",
      dataIndex: "air",
      key: "air",
    },
    {
      title: "Actions",
      key: "action",
      render: (temp) => (
        <>
          <EditOutlined
            style={{ cursor: "pointer", marginRight: "1rem" }}
            onClick={() => handleEdit(temp.key)}
          />
          <Popconfirm
            title="Are you sure to delete this car?"
            onConfirm={() => {
              dispatch(deleteCar({ carid: temp.key }));
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </>
      ),
    },
  ];
  
  function handleEdit(carid) {
    setIsModalVisible(true);
    setId(carid);
  }
  const handleOk = (values) => {
    values._id = id;
    dispatch(editCar(values));
    console.log(values);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  props.cars.forEach((car) => {
    temp.push({
      key: car._id,
      name: car.name,
      price: car.rentPerHour,
      capacity: car.capacity,
      fuelType: car.fuelType,
      gear: car.gear,
      air: car.air,
    });
  });

  return (
    <>
      <Row justify="center">
        <Col lg={12} sm={24}>
          <Table dataSource={temp} columns={columns} />
          <Modal
            title="Edit Car"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form layout="vertical" className="" onFinish={handleOk}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image"
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
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent Per Day"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="gear" label="Gear" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="air"
                label="Air-Condition"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <button className="reserve-btn">Update</button>
            </Form>
          </Modal>
        </Col>
      </Row>
    </>
  );
}

export default EditCars;
