import React from "react";
import { useNavigate, Link } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Link to='/'>
      <button
        className="btn btn-light "
        type="button"
        // onClick={() => navigate(-1)}
      >
        Home
      </button>
    </Link>
  );
};

export default BackButton;
