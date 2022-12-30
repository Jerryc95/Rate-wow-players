import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Context/Auth";

const ResetPassword = () => {
  const auth = useAuth();
  const navigate = useNavigate()
    const [firstPassword, setFirstPassword] = useState("")
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState('')

    const resetPassword = async () => {
      if(firstPassword === "" || password === "") {
        setAlertMessage('Please enter and re-enter your password.')
      } else if (firstPassword.length < 8 || password.lenth < 8) {
        setAlertMessage('Password must be at least 8 characters long.')
      } else {
        auth.updatePassword(password);
        navigate('/login')
      }
    }

    return(
        <div className="container">
        <div className="row justify-content-center p-5">
          <div className="d-flex justify-content-center p-2">
            <h1 className="font-weight-bold">Rate WoW Players</h1>
          </div>
          <div className="d-flex justify-content-center p-2">
            <h3 className="white-text">Enter new password</h3>
          </div>
          <form className="row justify-content-center p-2">
            <div className="form-group justify-content-center">
              <label className="text-muted">
                Password
              </label>
              <input
                className="form-control mb-1"
                required="required"
                type="password"
                placeholder="Enter password"
                value={firstPassword}
                onChange={(e) => {
                  setFirstPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group justify-content-center">
              <label className="text-muted">
                Re-enter password
              </label>
              <input
                className="form-control mb-1"
                required="required"
                type="password"
                placeholder="re-enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </form>
          <span className="text-danger d-flex justify-content-center">
          {alertMessage}
        </span>
        <div className="d-flex justify-content-center">
          
          <button className="btn btn-dark" type="button" onClick={resetPassword}>
            Reset
          </button>
      
        </div>
        </div>
      </div>
    )
}

export default ResetPassword