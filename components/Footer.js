import React from 'react';
import Link from "next/link";

const Footer = ({}) => {
  return (
    <footer>
      <ul className="ma0 pa3">
        <li>
          <Link href="/">
            <a>Terms of Use</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Code of Conduct</a>
          </Link>
        </li>
        <li>
          <a href="mailto:contact@a11y.info" target="_blank" rel="noopener noreferrer">contact@a11y.info</a>
        </li>
      </ul>
      <style jsx>
        {`
          footer {
            background-color: var(--background-darker-c);
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
            color: #f2f3f4;
            text-decoration: underline;
            font-weight: bold;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
