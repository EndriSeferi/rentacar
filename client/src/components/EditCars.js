import React, { useState } from "react";
import { Col, Row, Table, Popconfirm, Modal, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteCar, editCar } from "../redux/actions/carsAction";
import { useDispatch } from "react-redux";

function EditCars(props) {
  const temp = [];
  const [id, setId] = useState();
  const [editName, setEditName] = useState();
  const [editCapacity, setEditCapacity] = useState();
  const [editFuelType, setEditFuelType] = useState();
  const [editPrice, setEditPrice] = useState();
  const [editGear, setEditGear] = useState();
  const [editAir, setEditAir] = useState();
  const [editImage, setEditImage] = useState();
  const [editSecImage, setEditSecImage] = useState();

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
            onClick={() => handleEdit(temp)}
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

  function handleEdit(editedCar) {
    setId(editedCar.key);
    setEditName(editedCar.name);
    setEditCapacity(editedCar.capacity);
    setEditFuelType(editedCar.fuelType);
    setEditGear(editedCar.gear);
    setEditPrice(editedCar.price);
    setEditAir(editedCar.air);
    setEditImage(editedCar.image);
    setEditSecImage(editedCar.secImage);
    setIsModalVisible(true);
  }
  const handleOk = (values) => {
    // Check for empty inputs
    values._id = id;
    if (values.name === "") {
      values.name = editName;
    }
    if (values.image === "") {
      values.image = editImage;
    }
    if (values.secImage === "") {
      values.secImage = editSecImage;
    }
    if (values.capacity === "") {
      values.capacity = editCapacity;
    }
    if (values.fuelType === "") {
      values.fuelType = editFuelType;
    }
    if (values.rentPerHour === "") {
      values.rentPerHour = editPrice;
    }
    if (values.air === "") {
      values.air = editAir;
    }
    if (values.gear === "") {
      values.gear = editGear;
    }
    dispatch(editCar(values));
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
      image: car.image,
      secImage: car.secImage,
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
              <Form.Item name="name" label="Name" initialValue="">
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Image" initialValue="">
                <Input />
              </Form.Item>
              <Form.Item name="secImage" label="Second Image" initialValue="">
                <Input />
              </Form.Item>
              <Form.Item name="capacity" label="Capacity" initialValue="">
                <Input />
              </Form.Item>
              <Form.Item name="fuelType" label="Fuel Type" initialValue="">
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent Per Day"
                initialValue=""
              >
                <Input />
              </Form.Item>
              <Form.Item name="gear" label="Gear" initialValue="">
                <Input />
              </Form.Item>
              <Form.Item name="air" label="Air-Condition" initialValue="">
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
