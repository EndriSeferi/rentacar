import React from "react";
import MyForm from "./MyForm";
import "./Hero.css";

function Hero() {
  const lang = localStorage.getItem("lang");

  return (
    <div className="home">
      <h2 className="hero__title">
        {lang === "sq" ? (
          <div>
            Merr shpejt me qira makinat më të mira <br /> në Shqipëri
          </div>
        ) : (
          <div>
            Quickly rent the best cars <br /> in Albania
          </div>
        )}
      </h2>
      <MyForm />
    </div>
  );
}

export default Hero;
