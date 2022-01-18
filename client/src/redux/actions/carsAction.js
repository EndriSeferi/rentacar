import axios from "axios";
import { message } from "antd";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/cars/getallcars");
    dispatch({ type: "GET_ALL_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    dispatch({ type: "LOADING", payload: false });
    message.error({
      content: "Something went Wrong!",
      style: {
        marginTop: "20vh",
      },
    });
  }
};

export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/cars/addcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success({
      content: "Car added successfully",
      style: {
        marginTop: "20vh",
      },
    });
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    dispatch({ type: "LOADING", payload: false });
    message.error({
      content: "Something went Wrong!",
      style: {
        marginTop: "20vh",
      },
    });
  }
};

export const editCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/cars/editcar", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success({
      content: "Car Details Updated Successfully",
      style: {
        marginTop: "20vh",
      },
    });
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    message.error({
      content: "Something Went Wrong Updating the Car!",
      style: {
        marginTop: "20vh",
      },
    });
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/cars/deletecar", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success({
      content: "Car Deleted Successfully",
      style: {
        marginTop: "20vh",
      },
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    message.error({
      content: "Something Went Wrong Deleting Car!",
      style: {
        marginTop: "20vh",
      },
    });
    dispatch({ type: "LOADING", payload: false });
  }
};
