import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddCarForm from "../components/AddCarForm";
import EditCars from "../components/EditCars";
import Reservation from "../components/Reservation";
import { getAllBookings } from "../redux/actions/bookingActions";
import { getAllCars } from "../redux/actions/carsAction";

function Admin() {
  const { loading } = useSelector((state) => state.alertsReducer);
  const [form, setForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [res, setRes] = useState(false);

  const { cars } = useSelector((state) => state.carsReducer);
  const { bookings } = useSelector((state) => state.bookingReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getAllCars());
      dispatch(getAllBookings());
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleForm() {
    setForm(true);
    setEdit(false);
    setRes(false);
  }
  function handleEdits() {
    setEdit(true);
    setForm(false);
    setRes(false);
  }
  function handleReservation() {
    setRes(true);
    setForm(false);
    setEdit(false);
  }

  return (
    <div className="sector">
      <div className="wrapper">
        <button className="btn2" onClick={handleForm}>
          Add New Car
        </button>
        <button className="btn2" onClick={handleEdits}>
          Edit Cars
        </button>
        <button className="btn2" onClick={handleReservation}>
          Remove Reservation
        </button>
      </div>
      {!loading ? (
        <>
          {form && <AddCarForm />}
          {edit && <EditCars cars={cars} />}
          {res && <Reservation books={bookings} />}
        </>
      ) : (
        <div className="center">
          <h1>Loading...</h1>
          <img src="/loader.gif" alt="the car loader" />
        </div>
      )}
    </div>
  );
}

export default Admin;
