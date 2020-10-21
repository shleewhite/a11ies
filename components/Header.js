import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as cn from "classnames";

import { HEADER_PATHS } from "../lib/constants";

const Header = () => {
  const router = useRouter();

  return (
    <>
      <nav aria-label="Primary">
        <div className="nav-link-container tc">
          {HEADER_PATHS.map((link, i) => {
            let isCurrent;

            if (router.pathname === "/" || link.href === "/")
              isCurrent = router.pathname === link.href;
            else {
              const cleanedPath = router.pathname.replace("/", "");
              const cleanedHref = link.href.replace("/", "");
              isCurrent = cleanedPath.includes(cleanedHref);
            }

            return (
              <div className="nav-link" key={i}>
                <div
                  className={cn({
                    "half-circle": isCurrent,
                    "hidden-half-circle": !isCurrent,
                  })}
                />
                <Link href={link.href}>
                  <a aria-current={isCurrent}>{link.name}</a>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="nav-secondary">
          <div />
          <label htmlFor="global-search">Search</label>
          <input id="global-search" type="search" />
          <button>Login</button>
        </div>
      </nav>
      <style jsx>
        {`
          nav {
            font-size: var(--text-s);
            display: grid;
            grid-template-columns: 1fr 2fr;
          }

          .nav-link-container {
            display: grid;
            grid-template-columns: repeat(${HEADER_PATHS.length}, auto);
          }

          .nav-secondary {
            justify-self: end;
            align-self: end;

            display: grid;
            grid-template-columns: auto 2fr 1fr;
            grid-template-rows: 10px auto;
            align-items: center;
            gap: 0px 20px;
            grid-gap: 0px 20px;
            justify-items: center;
          }

          .nav-secondary > :first-child {
            grid-column: 1 / span 3;
          }

          .nav-link {
            display: grid;
            grid-template-rows: auto 1fr;
            justify-items: center;
          }

          .half-circle {
            width: 40px;
            height: 20px;
            border-radius: 0 0 150px 150px;
            background-color: var(--zazz-c);
          }

          .hidden-half-circle {
            width: 40px;
            height: 20px;
          }

          button {
            width: 80%;
          }

          label {
            font-size: var(--text-s);
            justify-self: end;
          }
        `}
      </style>
    </>
  );
};

export default Header;
