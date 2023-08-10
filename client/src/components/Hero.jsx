import React from "react";

const Hero = () => {
  return (
    <div
      className="container-fluid bg-dark text-white d-flex justify-content-center align-items-center flex-column"
      style={{ height: "50vh" }}
    >
      <h1 style={{ color: "orangered", textTransform: "uppercase" }}>
        Personalized News Hub
      </h1>
      <h4>The Website build using the News API.</h4>
    </div>
  );
};

export default Hero;
