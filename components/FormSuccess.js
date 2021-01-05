import React from "react";
import Link from "next/link";

export default function FormSuccess({ children }) {
  return (
    <>
      <h2>Success!</h2>
      {children}
    </>
  );
}
