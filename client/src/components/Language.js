import React from "react";

function Language() {
  const handleSQ = (e) => {
    localStorage.setItem("lang", e);
    window.location.reload();
  };

  return (
    <div className="lang">
      <h6>Choose a language</h6>
      <div className="wrap-btn">
        <button
          onClick={() => {
            handleSQ("sq");
          }}
        >
          Shqip
        </button>
        <button
          onClick={() => {
            handleSQ("en");
          }}
        >
          English
        </button>
      </div>
    </div>
  );
}

export default Language;
