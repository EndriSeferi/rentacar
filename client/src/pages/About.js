import React from "react";
import { Card } from "antd";

function About() {
  const lang = localStorage.getItem("lang");
  return (
    <div className="about">
      <h1>{lang === "sq" ? "Rreth Nesh" : "About Us"}</h1>
      <div id="info">
        <h4>
          {lang === "sq"
            ? "Një makinë luksoze me qira në Shqipëri/Tiranë ju jep privilegjin të udhëtoni si vendas dhe të zbuloni mrekullitë e qytetit aq sa dëshironi pa asnjë shqetësim. Tirana Rent Cars ka një qëllim të ngjashëm në mendje: t'u ofrojë klientëve të saj supermakinat më të mira me qira në Tiranë të disponueshme në çdo kohë. Ne kurrë nuk ndalemi së kërkuari mënyra për të përmirësuar përvojën tonë të përdoruesit dhe për të ofruar protokolle të thjeshtuara rezervimi për klientët tanë. Kuptimi i klientëve dhe kërkesat e tyre për qira të makinave është një shqetësim kryesor për ne dhe ne shkojmë në një masë të madhe për t'i ndihmuar ata të gjejnë automjetin e përsosur për udhëtimin e tyre familjar ose takimin e biznesit!"
            : "A luxury car rental in Albania/Tirana gives you the privilege to travel like a local and to discover the marvels of the city as much as you desire without any inconvenience. Tirana Rent Cars has a similar purpose in mind: to provide its clients with the best supercars rental Tirana available at all times. We never stop looking for ways to enhance our user experience and provide simplistic booking protocols to our customers. Understanding customers and their car hire requirements are a top concern for us, and we go to a great extent to assist them in finding the perfect vehicle for their family trip or business meeting!"}
        </h4>
      </div>
    </div>
  );
}

export default About;
