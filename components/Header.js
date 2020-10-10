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
    href: '/',
  }
];

const Header = ({}) => {
  return (
    <nav>
      <Link href="/">
        <a>A11ies.info</a>
      </Link>
      {
        header_links.map((link, i) =>(
          <Link href={link.href} key={i}>
            <a>{link.name}</a>
          </Link>
        ))
      }
    </nav>
  );
};

export default Header;