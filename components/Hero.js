import React from "react";

const Hero = ({ title, subtitle }) => {
  return (
    <div id="hero-container">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
};

export default Hero;
