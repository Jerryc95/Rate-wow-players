import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import { useAuth } from "../Context/Auth";

const ForgotPassword = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const forgotPassword = async () => {
    auth.forgotPassword(email);
    setAlertMessage("An email link has been sent to reset your password.");
  };

  return (
    <div className="container">
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row justify-content-center p-5">
          <div className="d-flex justify-content-center p-2">
            <h1 className="font-weight-bold">Rate WoW Players</h1>
          </div>
          <div className="d-flex justify-content-center p-2">
            <h3 className="white-text">Enter your email</h3>
          </div>
          <form className="row justify-content-center p-2">
            <div className="form-group justify-content-center">
              <label className="text-muted">Email</label>
              <input
                className="form-control mb-1"
                required="required"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </form>
          <span className="text-danger d-flex justify-content-center">
            {alertMessage}
          </span>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-dark"
              type="button"
              onClick={forgotPassword}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
