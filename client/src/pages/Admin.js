import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddCarForm from "../components/AddCarForm";

function Admin() {
  const { loading } = useSelector((state) => state.alertsReducer);
  const [form, setForm] = useState(false);
  const [edit, setEdit] = useState(false);

  function handleForm() {
    setForm(true);
    setEdit(false);
  }
  function handleEdits() {
    setEdit(true);
    setForm(false);
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
      </div>
      {!loading ? (
        <>
          {form && <AddCarForm />}
          {edit && <h1>test</h1>}
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
