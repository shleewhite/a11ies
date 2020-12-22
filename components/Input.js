import React, { useState } from "react";
import { nanoid } from "nanoid";
import * as cn from "classnames";

const Input = ({
  label, required, type, id, 
  prefix, description, error
}) => {
  const [realID] = useState(id !== "" ? id : nanoid);
  const prefixID = realID + '-prefix';
  const errorID = realID + '-error';
  const descriptionID = description ? realID + '-desc' : null;

  return (
    <>
      <div className={cn({"has-prefix": prefix})}>
        <label htmlFor={realID}>{label}</label>
        {description ? (<small id={descriptionID}>{description}</small>) : null}

        <div className="input-wrapper">
          <span id={prefixID}>{prefix}</span>
          {(type === "textarea") ? (
            <textarea
              id={realID}
              required={required}
              name={realID}
              aria-describedby={descriptionID}
            >
            </textarea>
           ) : (
            <input 
              id={realID} 
              required={required} 
              type={type} 
              name={realID}
              aria-describedby={`${prefixID} ${errorID} ${descriptionID}`} 
            />
           )
          }
        </div>

        <span className="input-error" id={errorID}>
          {error}
        </span>
      </div>
      <style jsx>
        {`
          div {
            width: 100%;
          }

          label {
            font-weight: 800;
          }

          small {
            display: block;
            font-size: var(--text-s);
          }

          input:not([type="checkbox"]), textarea {
            width: 100%;
          }

          .has-prefix .input-wrapper {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 3px;
            grid-gap: 3px;
            align-items: center;
          }

          input[type="checkbox"] {
            height: 2em;
            width: 2em;
          }

          input, textarea {
            background-color: var(--bg-light-c);
            border-radius: 5px;
            margin-top: .25em;
          }

          textarea {
            resize: vertical;
          }

          .input-error {
            color: var(--emphasis-c);
            font-weight: 800;
          }
        `}
      </style>
    </>
  );
};

Input.defaultProps = {
  label: "HEY YOU NEED A LABEL",
  required: false,
  type: "text",
  id: "",
};

export default Input;
