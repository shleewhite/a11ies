import React from "react";
import Link from "next/link";

export default function FormSuccess({ ctaButtons, children }) {
  return (
    <>
      <div>Success!</div>
      {children}

      {ctaButtons.map((cta) => (
        <Link href={cta.link}>
          <a>{cta.label}</a>
        </Link>
      ))}
    </>
  );
}
