import React from "react";
import MyForm from "./MyForm";
import "./Hero.css";

function Hero() {
  return (
    <div className="home">
      <h2 className="hero__title">
        Quickly rent the best cars <br /> in Albania
      </h2>
      <MyForm />
    </div>
  );
}

export default Hero;
