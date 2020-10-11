import React from 'react';
import Link from "next/link";

const header_links = [{
    name: 'Browse',
    href: '/',
  }, {
    name: 'Create',
    href: '/',
  }, {
    name: 'Request',
    href: '/',
  }, {
    name: 'Contribute',
    href: '/'
  }, {
    name: 'Resources',
    href: '/resources',
  }
];

const Header = ({}) => {
  return (
    <>
      <nav className="pa3">
        <Link href="/">
          <a className="b">A11ies.info</a>
        </Link>
        <div className="nav-link-container tc">
          {
            header_links.map((link, i) =>(
              <Link href={link.href} key={i}>
                <a>{link.name}</a>
              </Link>
            ))
          }
        </div>
        <div>
          <label htmlFor="global-search">Search</label>
          <input id="global-search" type="search" />
          <button>Login</button>
        </div>
      </nav>
      <style jsx>
        {`
          nav {
            background-color: var(--primary-c);
            font-size: 1.25rem;
            display: grid;
            grid-template-columns: auto 1fr auto;
            justify-items: center;
            grid-gap: 30px;
            gap: 30px;
            align-items: center;
          }

          .nav-link-container {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(
              ${header_links.length}, 1fr
            );
            align-items: center;
            border-right: 3px solid black;
            border-left: 3px solid black;
          }

          a:hover, a:focus {
            outline: none;
            text-decoration: underline;
          }
        `}
      </style>
    </>
  );
};

export default Header;
