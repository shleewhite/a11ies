import React, { useState } from "react";
import { nanoid } from "nanoid";
import * as cn from "classnames";

const Input = ({
  label,
  required,
  type,
  id,
  prefix,
  description,
  error,
  onBlur,
  readOnly,
  defaultValue,
  defaultChecked
}) => {
  const [realID] = useState(id !== "" ? id : nanoid);
  const prefixID = `${realID}-prefix`;
  const errorID = `${realID}-error`;
  const descriptionID = description ? `${realID}-desc` : null;

  return (
    <>
      <div className={cn({ "has-prefix": prefix })}>
        <label htmlFor={realID}>
          <span className="b">{label}</span>
          {required ? <span> (required)</span> : null}
        </label>
        {description ? <small id={descriptionID}>{description}</small> : null}

        <div className="input-wrapper">
          <span id={prefixID}>{prefix}</span>
          {type === "textarea" ? (
            <textarea
              id={realID}
              required={required}
              name={realID}
              aria-describedby={descriptionID}
              value={undefined}
              defaultValue={defaultValue}
              readOnly={readOnly}
            />
          ) : (
            <input
              id={realID}
              required={required}
              type={type}
              name={realID}
              aria-describedby={`${prefixID} ${errorID} ${descriptionID}`}
              onBlur={onBlur}
              value={undefined}
              defaultValue={defaultValue}
              defaultChecked={defaultChecked}
              readOnly={readOnly}
            />
          )}
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
            font-weight: 400;
          }

          small {
            display: block;
            font-size: var(--text-s);
          }

          input:not([type="checkbox"]),
          textarea {
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

          input,
          textarea {
            background-color: var(--bg-light-c);
            border-radius: 5px;
            margin: 0.25em 0;
          }

          textarea {
            resize: vertical;
          }

          .input-error {
            color: var(--emphasis-c);
            font-weight: 800;
          }

          input[readonly] {
            background-color: inherit;
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
  defaultValue: ""
};

export default Input;
