import React from "react";

const ImageCard = ({ image: { url, createdAt } }) => {
  return (
    <div style={{}}>
      <div className="card m-auto w-50" style={{ "min-width": "300px" }}>
        <img src={url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Click Time</h5>
          <p className="card-text">{createdAt}</p>
          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
