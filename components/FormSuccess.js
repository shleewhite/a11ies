import React from "react";
import Link from "next/link";

export default function FormSuccess({ children }) {
  return (
    <>
      <div>Success!</div>
      {children}
    </>
  );
}
