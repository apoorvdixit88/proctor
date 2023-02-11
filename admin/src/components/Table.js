import React from "react";
import ImageCard from "./ImageCard";

const Table = ({ userData: { name, email, code, images } }) => {
  return (
    <div className="d-flex flex-column justify-content-start ">
      <table className="table table-hover border-4 col">
        <thead>
          <tr className="">
            <th className="w-50" scope="col">
              Name
            </th>
            <th scope="col">Email</th>
            <th scope="col">Invitation Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{code}</td>
          </tr>
        </tbody>
      </table>
      <div className="col">
        <h5>IMAGES Of {name}</h5>
        <div className="row-3 ms-5">
          {images.map((image, index) => (
            <span className="col d-inline-block m-2">
              <ImageCard className="" image={image} />
            </span>
          ))}
        </div>
      </div>
      <hr className="rounded"></hr>
    </div>
  );
};

export default Table;
