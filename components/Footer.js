import React from "react";
import Link from "next/link";

import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer>
      <div>
        <Link href="/resources/terms-of-use">
          <a>Terms of Use</a>
        </Link>
        <Link href="/resources/code-of-conduct">
          <a>Code of Conduct</a>
        </Link>
        <a
          href="mailto:contact@a11y.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          contact@a11y.info
        </a>
        <span aria-hidden="true">\\</span>
        <a aria-label="Twitter" href="https://twitter.com/a11ies_info">
          Twitter
          {/* <SocialIcon icon="twitter" /> */}
        </a>
      </div>
      <style jsx>
        {`
          footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: end;
            color: var(--border-c);
            padding-bottom: 1em;
          }

          footer > div {
            grid-column: 2 / span 1;
          }

          div > * {
            margin: 0px 0.5rem 0px 0.5rem;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
