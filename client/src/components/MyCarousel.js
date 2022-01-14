import React, { useEffect } from "react";
import "./MyCarousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarCard from "./CarCard";
import { useSelector } from "react-redux";

function MyCarousel() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { cars } = useSelector((state) => state.carsReducer);

  return (
    <div className="big-carousel">
      <h2 className="best__cars">OUR CARS</h2>
      <Carousel responsive={responsive} showDots={true} className="carousel">
        {cars.map((car, index) => {
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
      </Carousel>
    </div>
  );
}

export default MyCarousel;
