import React from "react";
import Head from "next/head";

import Footer from "../Footer";
import Header from "../Header";
import Hero from "../Hero";

export default function HomeLayout({ children }) {
  return (
    <>
      <Head>
        <title>a11ies.info</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div id="page-container">
        <div id="nav-container">
          <div>
            <Header />
          </div>
        </div>

        <main>
          <Hero
            title="a11ies.info"
            subtitle="Let's make resources more accessible."
          />
          {children}
        </main>
        <Footer />
      </div>
      <style jsx>
        {`
          main {
            display: grid;
            grid-template-rows: auto 1fr;
          }
        `}
      </style>
    </>
  );
}
