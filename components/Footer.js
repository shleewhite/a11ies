import React from "react";
import Link from "next/link";

import { BREAKPOINTS } from "../lib/constants";

// import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer>
      <div>
        <Link href="/policy/terms-of-use">
          <a>Terms of Use</a>
        </Link>
        <Link href="/policy/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
        <Link href="/policy/copyright-policy">
          <a>Copyright Policy</a>
        </Link>
        <span aria-hidden="true">\\</span>
        <a
          href="mailto:contact@a11ies.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          contact@a11ies.info
        </a>
        <span aria-hidden="true">\\</span>
        <a aria-label="Twitter" href="https://twitter.com/a11ies_info">
          Twitter
          {/* <SocialIcon icon="twitter" /> */}
        </a>
        <a aria-label="Instagram" href="https://www.instagram.com/a11ies.info/">
          Instagram
          {/* <SocialIcon icon="instagram" /> */}
        </a>
      </div>
      <style jsx>
        {`
          div {
            display: grid;
            grid-template-columns: 1fr;
            justify-items: end;
            
            border-top: 10px solid var(--zazz-c);
            padding-top: var(--space-m);
          }

          span[aria-hidden="true"] {
            display: none;
          }

          div > * {
            margin: var(--space-0) var(--space-xs) var(--space-0)
              var(--space-xs);
          }

          div > span[aria-hidden="true"] + * {
            margin-top: var(--space-s);
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            div {
              display: block;
              text-align: right;
              border-top: 0;
            }

            span[aria-hidden="true"] {
              display: inline-block;
            }
          }

          a {
            color: var(--body-c);
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
