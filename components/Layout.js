import React from "react";
import Head from "next/head";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
