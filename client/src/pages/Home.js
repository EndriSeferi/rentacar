import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsAction";

import Hero from "../components/Hero";
import MyCarousel from "../components/MyCarousel";
function Home() {
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  return (
    <div className="sector">
      {!loading ? (
        <>
          <Hero />
          <MyCarousel />
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

export default Home;
