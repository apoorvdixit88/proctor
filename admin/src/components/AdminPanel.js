import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import { Header } from "./Header";
import Table from "./Table";
import Search from "./Search";
import { AllUsers } from "./AllUsers";

const AdminPanel = () => {
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = () => {
    // console.log(`http://localhost:3001/api/getAll`);
    fetch(`http://localhost:3001/api/getUser/${userEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
      });
  };

  return (
    <>
      <Header />
      <Search
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        handleSubmit={handleSubmit}
      />
      {userData ? <Table userData={userData} /> : null}

      <h1>All User List</h1>
      <AllUsers />
    </>
  );
};

export default AdminPanel;
