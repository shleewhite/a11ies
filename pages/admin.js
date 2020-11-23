import React, { useEffect, useContext, useState } from "react";
import {
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import Link from "next/link";

import Layout from "../components/Layouts/Layout";

import PageNotFound from "./404";

import { UserContext } from "../lib/user_context";
import { getAdminData, ADMIN_TABLE_HEADERS } from "../lib/admin";

export default function Admin() {
  const context = useContext(UserContext);
  const [adminData, setAdminData] = useState([]);
  const accessLevel = context.isLoggedIn ? context.user.accessLevel : -1;

  useEffect(() => {
    async function getData() {
      setAdminData(await getAdminData(accessLevel));
    }

    if (context.isLoggedIn && adminData.length === 0) getData();
  }, [adminData, setAdminData, accessLevel]);

  const renderTable = (id, data) => {
    const columns = Object.values(ADMIN_TABLE_HEADERS[id]);
    return (
      <Table bordered>
        <thead>
          <tr>
            {columns.map((colData) => (
              <th scope="col">{colData.name}</th>
            ))}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {columns.map((colData) => {
                const val = row[colData.id];
                if (typeof val === "object") {
                  return (
                    <td>
                      <a href={val.link}>{val.name}</a>
                    </td>
                  );
                } else if (typeof val === "boolean") {
                  return <td>{val ? "true" : "false"}</td>;
                } else return <td>{val}</td>;
              })}
              <td>
                <Dropdown>
                  <DropdownToggle caret />
                  <DropdownMenu>
                    <DropdownItem>Test</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
            </tr>
          ))}
          {/* {data.map((row) => (
            <tr>
              {Object.values(row).map((val) => {
                if (typeof val === "object") {
                  return (
                    <td>
                      <a href={val.link}>{val.name}</a>
                    </td>
                  );
                } else if (typeof val === "boolean") {
                  return <td>{val ? "true" : "false"}</td>;
                } else return <td>{val}</td>;
              })}
            </tr>
          ))} */}
        </tbody>
      </Table>
    );
  };

  const renderAdminContent = () => (
    <>
      {Object.entries(adminData).map(([id, section]) => (
        <>
          <h2>{section.name}</h2>
          {renderTable(id, section.data)}
        </>
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
