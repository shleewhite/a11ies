import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as cn from "classnames";

import { BREAKPOINTS } from "../lib/constants";

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
            padding: var(--space-xs);
            margin: var(--space-s) auto;
            width: fit-content;
            grid-gap: 20px;

            border-top: var(--space-xs) solid var(--zazz-c);
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            nav {
              padding: 0;
              margin: var(--space-s) var(--space-l) var(--space-0)
                var(--space-l);
              border-top: none;
            }
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

          a {
            color: var(--body-c);
          }
        `}
      </style>
    </>
  );
};

export default SubnNav;
