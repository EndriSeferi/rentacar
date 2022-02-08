import "./CarCard.css";
import { Link } from "react-router-dom";

function CarCard(props) {
  const lang = localStorage.getItem("lang");
  return (
    <div className="card">
      <img src={props.image} alt="Car " />
      <div className="info">
        <div className="title">
          <h2>{props.name}</h2>
        </div>
        <div className="characteristics">
          <div className="group">
            <i className="fa fa-user" />
            <p>{props.capacity}</p>
          </div>
          <div className="group">
            <i className="fas fa-gas-pump" />
            <p>{props.fuel}</p>
          </div>
          <div className="group">
            <i className="fas fa-tachometer-alt" />
            <p>{props.gear}</p>
          </div>
          <div className="group">
            <i className="fas fa-snowflake" />
            <p>{props.air}</p>
          </div>
        </div>
        <div className="end">
          <Link to={`/booking/${props.car_id}`} className="link__car">
            {lang === "sq" ? "Shiko Makinen" : "Check Car"}
          </Link>
          <div className="price">
            <p>Price</p>
            <h4>{props.price}$/day</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
