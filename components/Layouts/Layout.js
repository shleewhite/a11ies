import React from "react";
import Head from "next/head";

import Footer from "../Footer";
import Header from "../Header";
import SubNav from "../SubNav";
import Hero from "../Hero";

import { BREAKPOINTS } from "../../lib/constants";

export default function Layout({
  children,
  title,
  subtitle,
  subNavItems,
  styles,
  wideStyles,
}) {
  const formattedTitle =
    title === "a11ies.info" ? title : `${title} | a11ies.info`;

  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div id="page-container">
        <div id="nav-container">
          <div>
            <Header />
            {subNavItems ? <SubNav items={subNavItems} /> : null}
          </div>
        </div>

        <main>
          <Hero title={title} subtitle={subtitle} />
          <div id="main-content">{children}</div>
        </main>
        <Footer />
      </div>

      <style jsx>{`
        #main-content {
          ${styles}
        }

        @media ${BREAKPOINTS.MEDIUM_LARGE} {
          #main-content {
            ${wideStyles}
          }
        }
      `}</style>
    </>
  );
}
