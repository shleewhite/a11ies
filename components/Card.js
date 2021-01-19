import React from "react";
import classnames from "classnames";

const Card = ({
  header,
  headerLevel,
  children,
  hasTopZazz,
  style,
  imgLink,
  extraHeaderContent
}) => {
  return (
    <>
      <div
        className={classnames({
          "has-top-zazz": hasTopZazz,
        })}
      >
        {imgLink ? <img src={imgLink} alt="" /> : null}
        <div
          className={classnames(
            "text-content", {
            "sm-top-padding": hasTopZazz,
          })}
        >
          <div className="header-content">
            <h3 aria-level={headerLevel}>{header}</h3>
            <div>
              {extraHeaderContent}
            </div>
           </div>
          {children}
        </div>
      </div>
      <style jsx>
        {`
          div {
            background-color: var(--bg-dark-c);
          }

          img {
            width: 100%;
            width: -moz-available; /* For Mozzila */
            width: -webkit-fill-available; /* For Chrome */
            width: stretch;
          }

          div > * {
            margin-bottom: var(--space-s);
          }

          h3 {
            margin-top: var(--space-0);
            font-size: var(--text-m);
          }

          h3[aria-level="2"] {
            font-size: var(--text-l);
          }

          .header-content {
            display: grid;
            grid-template-columns: auto 1fr;
          }

          .header-content > div {
            align-self: end;
          }

          .text-content {
            padding: var(--space-m);
            line-height: var(--lh-m);
          }

          .sm-top-padding {
            padding-top: var(--space-s) !important;
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
