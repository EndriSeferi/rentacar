import React from "react";
import { useLocation } from "react-router-dom";

import CarCard from "../components/CarCard";

function SearchedCars() {
  const state = useLocation();
  let totalCars = state.state.totalCars;
  return (
    <div className="sector">
      <div className="container">
        {totalCars.map((car, index) => {
          return (
            <CarCard
            
              key={index}
              car_id={car._id}
              image={car.image}
              name={car.name}
              model={car.model}
              price={car.rentPerHour}
              capacity={car.capacity}
              fuel={car.fuelType}
              gear={car.gear}
              air={car.air}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchedCars;
