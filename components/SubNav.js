import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as cn from "classnames";

const SubnNav = ({ items }) => {
  const router = useRouter();

  return (
    <>
      <nav aria-label="Secondary">
        {items.map((link, i) => (
          <div key={i}>
            <div
              className={cn({
                circle: router.pathname === link.href,
                "hidden-circle": router.pathname !== link.href,
              })}
            />
            <Link href={link.href}>
              <a aria-current={router.pathname === link.href}>{link.name}</a>
            </Link>
          </div>
        ))}
      </nav>
      <style jsx>
        {`
          nav {
            display: grid;
            grid-template-columns: repeat(${items.length}, 1fr);
            margin: 1rem 4rem 0 4rem;
            width: fit-content;
            grid-gap: 20px;
          }

          .circle {
            width: 15px;
            height: 15px;
            border-radius: 150px;
            background-color: var(--zazz-c);
          }

          .hidden-circle {
            width: 15px;
            height: 15px;
          }

          nav > div {
            display: grid;
            width: 100%;
            grid-template-columns: auto 1fr;
            gap: 5px;
            grid-gap: 5px;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};

export default SubnNav;
