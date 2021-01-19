import React, { useState, useEffect } from "react";
import { nolookalikes } from "nanoid-generate"; // generates unique id without characters that look similar ie. 1 and I
import * as copy from "copy-to-clipboard"; // copy-to-clipboard
import Link from "next/link";

import TranscriptForm from "../../components/TranscriptForm";

export default function Create() {
  return (
    <TranscriptForm/>
  );
}