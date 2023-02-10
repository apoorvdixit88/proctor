import React from "react";

const Search = ({ userEmail, setUserEmail, handleSubmit }) => {
  return (
    <div className="d-flex justify-content-center m-4">
      <div
        style={{ width: 500, alignItems: "center" }}
        className="input-group mb-3 border-secondary rounded border-5 fs-3"
      >
        <input
          type="text"
          className="form-control fs-5"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter User email"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          className="btn fs-5 btn-outline-success"
          type="button"
          id="button-addon2"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
