import React from "react";
import "./Footer.css";
function Footer() {
  const lang = localStorage.getItem("lang");
  return (
    <div className="footer">
      <h1 className="footer__title">
        {lang === "sq"
          ? "Për më shumë informacion më kontaktoni!"
          : "For More Information Contact Me!"}
      </h1>
      <div className="contact__info">
        <div className="group__contact">
          <i className="fa fa-phone" />
          <p>Phone:</p>
          <p>+355 68 488 8888</p>
          <p>+355 69 213 5332</p>
        </div>
        <div className="group__contact">
          <i className="fa fa-envelope" />
          <p>Email:</p>
          <p>tiranarentcars@gmail.com</p>
        </div>
        <div className="group__contact">
          <i className="fa fa-map-marker" />
          <p>Location:</p>
          <p>
            {lang === "sq"
              ? "Rr. Myslym Shyri nr. 91"
              : "Str. Myslym Shyri no. 91"}
          </p>
          <p>{lang === "sq" ? "Tirane, Shqiperi" : "Tirana, Albania"}</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
