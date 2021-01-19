import React, { useState } from "react";
// import classnames from "classnames";
import { numbers } from "nanoid-generate";

const HEADER_PREFIX = "sh-";
const SECTION_PREFIX = "sc-";
const ACCORDION_PREFIX = "accordion-";

const ExpandableSection = ({
  handleKeyDown,
  headerLevel,
  header,
  content,
  expanded,
  id,
  // index,
}) => {
  const [ariaExpanded, setAriaExpanded] = useState(expanded);
  const handleClick = () => {
    setAriaExpanded(!(ariaExpanded === true));
  };

  return (
    <div>
      <h3 aria-level={headerLevel}>
        <button
          id={HEADER_PREFIX + id}
          className="expandableToggle"
          aria-controls={SECTION_PREFIX + id}
          aria-expanded={ariaExpanded}
          onClick={handleClick}
          onKeyDown={handleKeyDown || null}
        >
          <span aria-hidden="true">{ariaExpanded ? "⬇️ " : "➡️ "}</span>
          {header}
        </button>
      </h3>
      <section
        id={SECTION_PREFIX + id}
        aria-labelledby={HEADER_PREFIX + id}
        className={ariaExpanded ? null : "hide"}
      >
        {content}
      </section>
      <style jsx>
        {`
          button {
            border-radius: 0;
            border: transparent;
          }

          button:hover,
          button:focus {
            text-decoration: underline;
          }

          .hide {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

const Accordion = ({ headerLevel, sections, startExpanded }) => {
  const id = numbers(4);

  // Up/Down arrow keys cycle focus through accordion headers
  const handleKeyDown = (event, index) => {
    let newIndex = null;

    if (event.key === "ArrowDown") {
      newIndex = index === sections.length - 1 ? 0 : index + 1;
    } else if (event.key === "ArrowUp") {
      newIndex = index === 0 ? sections.length - 1 : index - 1;
    }

    if (newIndex !== null) {
      const newEl = document.querySelector(
        `#${HEADER_PREFIX + id}-${newIndex}`
      );
      if (newEl) {
        newEl.focus();
        event.preventDefault();
      }
    }
  };

  return (
    <>
      <div id={`${ACCORDION_PREFIX}-${id}`}>
        {sections.map((section, i) => (
          <ExpandableSection
            handleKeyDown={(event) => {
              handleKeyDown(event, i);
            }}
            headerLevel={headerLevel}
            header={section.header}
            content={section.content}
            expanded={section.expanded || startExpanded}
            id={`${id}-${i}`}
            index={i}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Accordion;
