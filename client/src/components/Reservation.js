import React from "react";
import { Col, Row, Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../redux/actions/bookingActions";

function Reservation(props) {
  const temp = [];
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Phone",
      dataIndex: "userPhone",
      key: "userPhone",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "From",
      dataIndex: "From",
      key: "From",
    },
    {
      title: "To",
      dataIndex: "To",
      key: "To",
    },
    {
      title: "Total Days",
      dataIndex: "totalDays",
      key: "totalDays",
    },
    {
      title: "Total Price",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Actions",
      key: "action",
      render: (temp) => (
        <Popconfirm
          title="Are you sure to delete this car?"
          onConfirm={() => {
            dispatch(
              deleteBooking({
                bookid: temp.key,
                carid: temp.car,
                from: temp.from,
              })
            );
          }}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ];
  props.books.map((book) => {
    temp.push({
      key: book._id,
      car: book.car,
      userName: book.userName,
      userPhone: book.userPhone,
      userEmail: book.userEmail,
      From: book.bookedTimeSlots.from,
      To: book.bookedTimeSlots.to,
      totalDays: book.totalDays,
      totalAmount: book.totalAmount,
    });
  });

  return (
    <div>
      <Row justify="center">
        <Col lg={20} sm={40}>
          <Table dataSource={temp} columns={columns} />
        </Col>
      </Row>
    </div>
  );
}

export default Reservation;
