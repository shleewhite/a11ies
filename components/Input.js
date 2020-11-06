import React from "react";
import shortid from "shortid";

const Input = ({ label, required, type, id }) => {
  const backupID = shortid.generate();
  return (
    <div>
      <label htmlFor={id !== "" ? id : backupID}>{label}</label>
      <input
        id={id !== "" ? id : backupID}
        required={required}
        type={type}
        name={id !== "" ? id : backupID}
      />
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
