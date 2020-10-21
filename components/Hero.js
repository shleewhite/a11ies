import React from "react";

const Hero = ({ title, subtitle }) => {
  return (
    <div id="hero-container">
      <div>
        <h1 className="mv0">{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <style jsx>
        {`
          #hero-container {
            background-color: white;
            padding-bottom: var(--space-xs);
          }

          h1 {
            font-size: var(--text-xl);
            color: var(--headline-c);
          }

          p {
            margin-bottom: var(--space-s);
            padding-bottom: var(--space-xs);
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
