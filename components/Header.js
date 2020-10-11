import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

const header_links = [{
    name: 'Browse',
    href: '/browse',
  }, {
    name: 'Create',
    href: '/create',
  }, {
    name: 'Request',
    href: '/request',
  }, {
    name: 'Contribute',
    href: '/contribute'
  }, {
    name: 'Resources',
    href: '/resources',
  }
];

const Header = ({}) => {
  const router = useRouter();

  return (
    <>
      <nav className="pa3">
        <Link href="/">
          <a className="b" aria-current={router.pathname === '/'}>A11ies.info</a>
        </Link>
        <div className="nav-link-container tc">
          {
            header_links.map((link, i) =>(
              <Link href={link.href} key={i}>
                <a aria-current={router.pathname === link.href}>
                  {link.name}
                </a>
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

          a[aria-current="true"] {
            text-decoration: underline;
          }

          a:hover, a:focus {
            outline: 2px solid var(--secondary-c);
          }
        `}
      </style>
    </>
  );
};

export default Header;
