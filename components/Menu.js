import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { BREAKPOINTS } from "../lib/constants";

import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from "@reach/menu-button";
import { positionRight } from "@reach/popover";

const MenuComponent = ({buttonContent, items}) => {
  const router = useRouter();
  return (
    <>
      <Menu>
        <MenuButton className="menu-button">
          {buttonContent}
          <svg aria-hidden="true" viewBox="0 0 50 43.3">
            <polygon points="0,0 50,0 25.0,43.3"></polygon>
          </svg>
        </MenuButton>
        <MenuPopover position={positionRight}>
          <MenuItems className="menu">
          {items.map((item, i) => {
            return (
              <MenuItem key={i}
                className="menu-item"
                onSelect={item.url ? 
                  () => {router.push(item.url)} :
                  item.onClick
                }
              >
                {item.label}
              </MenuItem>
            );
          })}
          </MenuItems>
        </MenuPopover>
      </Menu>
      <style global jsx>
        {`
          :root {
            --reach-menu-button: 1;
          }

          [data-reach-menu-button] {
            border: 0;
            margin: var(--space-s) 0;
            padding: 0;
            color: var(--headline-c);
            font-weight: bold;
          }

          [data-reach-menu-button]:not(:focus-visible) {
            box-shadow-color: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
          }

          [data-reach-menu-button] img {
            height: 3rem;
            width: 3rem;
            border-radius: 50%;
          }

          [data-reach-menu-button] svg {
            display: none;
          }

          [data-reach-menu-items] {
            margin-top: var(--space-s);

            width: 18rem;
            display: grid;
            grid-template-columns: 100%;

            background-color: var(--bg-light-c);

            box-shadow: 0px 0px 0px var(--border-s) var(--zazz-c);
            -webkit-box-shadow: 0px 0px 0px var(--border-s) var(--zazz-c);
            -moz-box-shadow: 0px 0px 0px var(--border-s) var(--zazz-c);
          }

          [data-reach-menu-items]:focus {
            outline: none;
          }

          [data-reach-menu-item] {
            border: 0;
            border-radius: 0;
            background-color: transparent;
            padding: var(--space-s);
            color: var(--headline-c);
            text-align: left;
            cursor: pointer;
          }

          [data-reach-menu-items], 
          [data-reach-menu-item]:last-child {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }

          [data-reach-menu-items], 
          [data-reach-menu-item]:first-child {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }

          [data-reach-menu-button]:hover, 
          [data-reach-menu-item]:hover {
            background-color: var(--bg-medium-c);
          }

          [data-reach-menu-item][data-selected] {
            background-color: var(--bg-dark-c);
            outline: none;
            box-shadow: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            [data-reach-menu-button] {
              padding: var(--space-xs) var(--space-s);
            }

            [data-reach-menu-button] svg {
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
