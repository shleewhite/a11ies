import React, { useEffect, useContext, useState } from "react";
import {
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";

import Layout from "../components/Layouts/Layout";

import PageNotFound from "./404";

import { UserContext } from "../lib/user_context";
import { getAdminData, ADMIN_TABLES } from "../lib/admin";

export default function Admin() {
  const context = useContext(UserContext);
  const [adminData, setAdminData] = useState([]);
  const accessLevel = context.isLoggedIn ? context.user.accessLevel : -1;

  const [dropdownOpen, setDropdownOpen] = useState("");
  const toggleDropdown = (id) => {
    setDropdownOpen((prevState) => (prevState === id ? "" : id));
  };

  useEffect(() => {
    async function getData() {
      setAdminData(await getAdminData(accessLevel));
    }

    if (context.isLoggedIn && adminData.length === 0) getData();
  }, [adminData, setAdminData, accessLevel]);

  const renderTable = (collection, data) => {
    const columns = Object.values(ADMIN_TABLES[collection]["column-headers"]);
    const actions = Object.values(ADMIN_TABLES[collection].actions);
    return (
      <Table bordered>
        <thead>
          <tr>
            {columns.map((colData, i) => (
              <th scope="col" key={`${colData.id}-${i}`}>
                {colData.name}
              </th>
            ))}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={`${collection}-row-${i}`}>
              {columns.map((colData, j) => {
                let val = row[colData.id];

                if (val instanceof Array) val = val.toString();
                else if (
                  collection === "trancripts" &&
                  typeof val === "object"
                ) {
                  val = (
                    <Link href={val.link}>
                      <a>{val.name}</a>
                    </Link>
                  );
                } else if (typeof val === "object")
                  val = <a href={val.link}>{val.name}</a>;
                else if (typeof val === "boolean") val = val ? "true" : "false";

                return <td key={`${collection}-row-${i}-cell-${j}`}>{val}</td>;
              })}
              <td>
                <Dropdown
                  isOpen={dropdownOpen === `${collection}-row-${i}-action`}
                  toggle={() => {
                    toggleDropdown(`${collection}-row-${i}-action`);
                  }}
                  id={`${collection}-row-${i}-action`}
                >
                  <DropdownToggle>Actions</DropdownToggle>
                  <DropdownMenu>
                    {actions.map((action, j) => (
                      <DropdownItem
                        key={`${collection}-row-${i}-action-${j}`}
                        onClick={() => {
                          // action.function(row.id, collection);
                        }}
                      >
                        {action.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderAdminContent = () => (
    <>
      {Object.entries(adminData).map(([id, section]) => (
        <div key={id}>
          <h2>{section.name}</h2>
          {renderTable(id, section.data)}
        </div>
      ))}
    </>
  );

  return (
    <>
      {accessLevel === -1 ? null : (
        <>
          {accessLevel > 0 ? (
            <Layout title="Admin">{renderAdminContent()}</Layout>
          ) : (
            PageNotFound()
          )}
        </>
      )}
    </>
  );
}
