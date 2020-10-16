import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <ul className="ma0 pa3">
        <li>
          <Link href="/resources/terms-of-use">
            <a>Terms of Use</a>
          </Link>
        </li>
        <li>
          <Link href="/resources/code-of-conduct">
            <a>Code of Conduct</a>
          </Link>
        </li>
        <li>
          <a
            href="mailto:contact@a11y.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            contact@a11y.info
          </a>
        </li>
      </ul>
      <style jsx>
        {`
          footer {
            background-color: transparent;
            width: 100%;
          }

          ul {
            grid-template-columns: 1fr 1fr 1fr;
            justify-items: center;
            text-align: center;
            display: grid;
            list-style: none;
          }

          a {
            text-decoration: underline;
            font-weight: bold;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
