import React from "react";
import Link from "next/link";
// import * as cn from "classnames";

import Card from "./Card";

const Prompt = ({ header, headerLevel }) => {
  return (
    <Card
      header={header || "Can't find what you're looking for?"}
      headerLevel={headerLevel}
      hasTopZazz
    >
      <span>
        You're welcome to{" "}
        <Link href="/request">
          <a>request a transcript</a>
        </Link>{" "}
        or{" "}
        <Link href="/contribute">
          <a>create a new one</a>
        </Link>
        .
      </span>
      <style jsx>
        {`
          a {
            font-weight: 800;
          }
        `}
      </style>
    </Card>
  );
};

export default Prompt;
