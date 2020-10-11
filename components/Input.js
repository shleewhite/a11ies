import React from "react";
import shortid from "shortid";

const Input = ({ label, required, type }) => {
  const id = shortid.generate();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} required={required} type={type} />
    </div>
  );
};

Input.defaultProps = {
  label: "HEY YOU NEED A LABEL",
  required: false,
  type: "text",
};

export default Input;
