import React from "react";
import Link from "next/link";

import { BREAKPOINTS } from "../lib/constants";

import {
  useMenuState,
  Menu,
  MenuItem,
  MenuButton,
  MenuSeparator,
} from "reakit/Menu";

const MenuComponent = ({label, buttonContent, items}) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu} className="menu-button">
        {buttonContent}
        <svg aria-hidden="true" viewBox="0 0 50 43.3">
          <polygon points="0,0 50,0 25.0,43.3"></polygon>
        </svg>
      </MenuButton>
      <Menu {...menu} aria-label={label} className="menu">
        {items.map((item, i) => {
          return (
            <MenuItem
              key={i}
              {...menu}
              className="menu-item"
              onClick={item.onClick}
            >
              {item.label}
            </MenuItem>
          );

        })}
      </Menu>
      <style global jsx>
        {`
          .menu-button {
            border: 0;
            margin: var(--space-s) 0;
            padding: 0;
            color: var(--headline-c);
          }

          .menu-button[aria-expanded="true"] {
            font-weight: bold;
          }

          ${/* this is a hack to stop the flash of a border
               when activating this button via mouse click */''}
          .menu-button[aria-expanded="true"]:focus,
          .menu-button:hover:focus {
            box-shadow-color: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
          }


          .menu-button img {
            height: 3rem;
            width: 3rem;
            border-radius: 50%;
          }

          .menu-button svg {
            display: none;
          }

          .menu {
            margin-top: var(--space-xs);
            background-color: var(--bg-light-c);
            width: 20rem;
            display: grid;
            grid-template-columns: 100%;
            box-shadow: 0px 0px 0px var(--border-s) var(--zazz-c);
            -webkit-box-shadow: 0px 0px 0px var(--border-s) var(--zazz-c);
            -moz-box-shadow: 0px 0px 0px var(--border-s) var(--zazz-c);
          }

          .menu:focus {
            outline: none;
          }

          .menu-item {
            border: 0;
            border-radius: 0;
            background-color: transparent;
            padding: var(--space-s);
            color: var(--headline-c);
            text-align: left;
          }

          .menu, .menu-item:last-child {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }

          .menu, .menu-item:first-child {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }

          .menu-button:hover, .menu-item:hover {
            background-color: var(--bg-medium-c);
          }

          .menu-item:focus {
            background-color: var(--bg-dark-c);
            outline: none;
            box-shadow: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            .menu-button {
              padding: var(--space-xs) var(--space-s);
            }

            .menu-button svg {
              display: inline-block;
              fill: var(--body-c);
              width: 0.65em;
              height: 0.65em;
              margin-left: 0.5em;
            }
          }
        `}
      </style>
    </>
  );
};

export default MenuComponent;
