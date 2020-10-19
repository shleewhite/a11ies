import React from "react";

const Hero = ({ title, subtitle }) => {
  return (
    <div className="pv3" id="hero-container">
      <div>
        <h1 className="mv0">{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <style jsx>
        {`
          #hero-container {
            background-color: white;
          }

          h1 {
            font-size: var(--text-xl);
          }

          p {
            margin-bottom: 1em;
            padding-bottom: 0.5em;
            border-bottom: 10px solid var(--zazz-c);
            width: max-content;
            font-style: italic;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
