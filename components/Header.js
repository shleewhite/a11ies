import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as cn from "classnames";

import { HEADER_PATHS } from "../lib/constants";

const Header = () => {
  const router = useRouter();

  return (
    <>
      <nav>
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
          <label htmlFor="global-search">Search</label>
          <input id="global-search" type="search" />
          <button>Login</button>
        </div>
      </nav>
      <style jsx>
        {`
          nav {
            font-size: 1rem;
            display: grid;
            grid-template-columns: 1fr 2fr;
          }

          .nav-link-container {
            display: grid;
            grid-template-columns: repeat(${HEADER_PATHS.length}, auto);
            align-items: center;
          }

          .nav-secondary {
            justify-self: end;
            align-self: end;

            display: grid;
            grid-template-columns: auto 2fr 1fr;
            align-items: center;
            gap: 20px 10px;
            grid-gap: 20px 10px;
            justify-items: center;
          }

          .nav-link {
            display: grid;
            grid-template-rows: 1fr;
            justify-items: center;
          }

          .half-circle {
            position: absolute;
            top: 0;
            width: 40px;
            height: 20px;
            border-radius: 0 0 150px 150px;
            background-color: var(--zazz-c);
          }

          button {
            width: 80%;
          }

          label {
            font-size: 1rem;
            justify-self: end;
          }
        `}
      </style>
    </>
  );
};

export default Header;
