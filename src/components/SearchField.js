import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchField = () => {
  const [name, setName] = useState("");
  const [realm, setRealm] = useState("");

  const handleSearchClick = (event) => {
    if (name !== "" && realm !== "") {
      setName("");
      setRealm("");
    } else {
      alert("Please enter both the character and realm name");
      event.preventDefault()
    }
  };

  return (
    <div className="row justify-content-center p-5">
      <div className="d-flex justify-content-center p-2">
        <h1 className="font-weight-bold">Rate WoW Players</h1>
      </div>
      <div className="d-flex justify-content-center p-2">
        <h2 className="white-text">Search a player to get started</h2>
      </div>
      <input
        className="form-control form-control-lg mb-1"
        required="required"
        type="text"
        placeholder="Character"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        className="form-control form-control-lg mt-1"
        required="required"
        type="text"
        placeholder="Realm"
        value={realm}
        onChange={(e) => {
          setRealm(e.target.value);
        }}
      />

      <div className="d-flex justify-content-center p-2">
        <Link to={`/character/${realm}/${name}`}>
          <button
            className="btn btn-dark"
            type="button"
            onClick={handleSearchClick}
          >
            Look Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchField;
