import React from "react";
import classnames from "classnames";

const Card = ({ header, headerLevel, children, hasTopZazz, style }) => {
  return (
    <>
      <div
        className={classnames({
          "has-top-zazz": hasTopZazz,
        })}
      >
        <h3 aria-level={headerLevel}>{header}</h3>
        {children}
      </div>
      <style jsx>
        {`
          div {
            background-color: var(--bg-dark-c);
            padding: var(--space-m);
          }

          h3 {
            margin-top: var(--space-0);
          }

          .has-top-zazz {
            border-top: 10px solid var(--zazz-c);
          }

          ${style}
        `}
      </style>
    </>
  );
};

export default Card;
