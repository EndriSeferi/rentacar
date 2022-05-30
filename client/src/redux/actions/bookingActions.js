import axios from "axios";
import { message } from "antd";
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/bookings/bookcar", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success({
      content: "Your car booked successfully",
      style: {
        marginTop: "20vh",
      },
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong , please try later");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/bookings/getallbookings");
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error({
      content: "Did not receive bookings",
      style: "margin-top: 20vh",
    });
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteBooking = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/bookings/deletebooking", reqObj);
    dispatch({ type: "LOADING", payload: false });
    console.log("Booking Deleted Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
