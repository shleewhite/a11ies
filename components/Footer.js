import React from "react";
import Link from "next/link";

// import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer>
      <div>
        <Link href="/contribute/resources/terms-of-use">
          <a>Terms of Use</a>
        </Link>
        <Link href="/contribute/resources/code-of-conduct">
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
        <a aria-label="Instagram" href="https://www.instagram.com/a11ies.info/">
          Instagram
          {/* <SocialIcon icon="instagram" /> */}
        </a>
      </div>
      <style jsx>
        {`
          footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: end;
            padding-bottom: var(--space-s);
          }

          footer > div {
            grid-column: 2 / span 1;
          }

          div > * {
            margin: var(--space-0) var(--space-xs) var(--space-0)
              var(--space-xs);
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
