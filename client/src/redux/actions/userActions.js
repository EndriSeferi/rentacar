import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success({
      content: "User Logged in Successfully",
      style: {
        marginTop: "20vh",
      },
    });
    dispatch({ type: "LOADING", payload: false });
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
