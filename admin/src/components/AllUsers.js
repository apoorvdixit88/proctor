import React, { useState, useEffect } from "react";
import axios from "axios";

export const AllUsers = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/api/getAll`)
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);
  return (
    <>
      {console.log(userData)}
      <div className="d-flex flex-column justify-content-start ">
        <table className="table table-hover border-4">
          <thead>
            <tr className="">
              <th className="w-50" scope="col">
                Name
              </th>
              <th scope="col">Email</th>
              <th scope="col">Code</th>
            </tr>
          </thead>

          <tbody>
            {userData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
