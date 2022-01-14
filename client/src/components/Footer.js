import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <h1 className="footer__title">For More Information Contact Me!</h1>
      <div className="contact__info">
        <div className="group__contact">
          <i className="fa fa-phone" />
          <p>Phone:</p>
          <p>+355 xx xx xxxx</p>
        </div>
        <div className="group__contact">
          <i className="fa fa-envelope" />
          <p>Email:</p>
          <p>+355 xx xx xxxx</p>
        </div>
        <div className="group__contact">
          <i className="fa fa-map-marker" />
          <p>Location:</p>
          <p>+355 xx xx xxxx</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
