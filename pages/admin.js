import React, { useEffect, useContext, useState } from "react";
// import Link from "next/link";

import Layout from "../components/Layouts/Layout";

import PageNotFound from "./404";

import { UserContext } from "../lib/user_context";
import { getAdminData } from "../lib/admin";

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

  return (
    <>
      {accessLevel > 0 ? (
        <Layout title="Admin">
          {adminData.map((item) => (
            <>
              <h2>{item.name}</h2>
              {item.data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      {Object.keys(item.data[0]).map((key) => (
                        <th scope="col">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.data.map((row) => {
                      return (
                        <tr>
                          {Object.values(row).map((val) => (
                            <td>{val}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p>No {item.name}</p>
              )}
            </>
          ))}
        </Layout>
      ) : (
        PageNotFound()
      )}
    </>
  );
}
