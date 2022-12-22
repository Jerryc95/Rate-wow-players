import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

import supabase from "../Provider/supabase";

const ForgotPassword = () => {
    const [userEmail, setUserEmail] = useState("");

    const resetPassword = async () => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(userEmail, {
            redirectTo: 'https://example.com/update-password',
          })
    }

    return(
        <div className="container mt-2">
        <div>
          <BackButton />
        </div>
        <div className="row justify-content-center p-5">
          <div className="d-flex justify-content-center p-2">
            <h1 className="font-weight-bold">Rate WoW Players</h1>
          </div>
          <div className="d-flex justify-content-center p-2">
            <h3 className="white-text">Enter email below</h3>
          </div>
          <form className="col">
            <div className="form-group justify-content-center">
              <label className="text-muted">
                Email address
              </label>
              <input
                className="form-control mb-1"
                required="required"
                type="text"
                placeholder="Enter email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </div>
          </form>
          <div className="d-flex justify-content-center p-2">
            <Link className="pt-2">
              <button className="btn btn-dark" type="button" onClick={resetPassword}>
                Reset
              </button>
            </Link>
          </div>
          <div className="col pt-2">
            <Link className="text-secondary" to='/register'>
              <div className="d-flex justify-content-center">
                <span className="">Don't have an account? Sign up</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
}

export default ForgotPassword