import React from "react";
// import { nanoid } from "nanoid";
// import * as cn from "classnames";

const IconButton = ({ label, onClick, children }) => {
  return (
    <>
      <button aria-label={label} title={label} onClick={onClick}>
        <span aria-hidden="true">{children}</span>
      </button>
      <style jsx>
        {`
          button {
            background-color: var(--bg-medium-c);
            width: 4rem;
            height: 4rem;
            text-align: center;
            border-color: transparent;
          }

          button:active {
            background-color: var(--bg-dark-c);
            border-color: var(--border-c);
          }
        `}
      </style>
    </>
  );
};

export default IconButton;
