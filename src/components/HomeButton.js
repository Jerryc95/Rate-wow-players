import React from "react";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <Link to="/">
      <button className="btn btn-light " type="button">
        Home
      </button>
    </Link>
  );
};

export default HomeButton;
