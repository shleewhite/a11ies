import React from "react";

import { BREAKPOINTS } from "../lib/constants";

const Hero = ({ title, subtitle }) => {
  return (
    <div id="hero-container">
      <div>
        <h1 className="mv0">{title}</h1>
        {subtitle ? <p>{subtitle}</p> : <span />}
      </div>
      <style jsx>
        {`
          #hero-container {
            background-color: white;
          }

          h1 {
            font-size: var(--text-xl);
            color: var(--headline-c);
          }

          p {
            display: inline-block;
            margin-bottom: var(--space-s);
            padding-bottom: var(--space-xs);
            border-bottom: 10px solid var(--zazz-c);
            width: max-content;
            font-style: italic;
          }

          span {
            display: inline-block;
            height: 10px;
            background-color: var(--zazz-c);
            width: 25%;
            margin-bottom: var(--space-s);
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            h1 {
              font-size: var(--text-xxl);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
