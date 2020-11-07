import React, { useState } from "react";
import { nanoid } from "nanoid";

const Input = ({ label, required, type, id }) => {
  const [realID] = useState(id !== "" ? id : nanoid);
  return (
    <div>
      <label htmlFor={realID}>{label}</label>
      <input id={realID} required={required} type={type} name={realID} />
    </div>
  );
};

Input.defaultProps = {
  label: "HEY YOU NEED A LABEL",
  required: false,
  type: "text",
  id: "",
};

export default Input;
