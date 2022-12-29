import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import pixelDino from "../assets/pixelDino.jpeg"

const NotFound = () => {
  return (
    <div className="container">
      <div>
        <Navbar />
      </div>
      <div className="row justify-content-center p-5">
        <div className="d-flex justify-content-center p-2">
          <h1 className="font-weight-bold">Page not found!</h1>
          
        </div>
        <img src={pixelDino}  alt='pixel dinosaur' className="w-25"/>
        <div className="d-flex justify-content-center p-2">
          <Link to="/">
            <button className="btn btn-dark" type="button">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
