import React, { useState } from "react";
import { Link } from "react-router-dom";
// import HomeButton from "../components/HomeButton";
import Navbar from "../components/Navbar";

// import supabase from "../Provider/supabase";
import { useAuth } from "../Context/Auth";

const ForgotPassword = () => {
  const auth = useAuth();
    const [email, setEmail] = useState("");

    const resetPassword = async () => {
      auth.resetPassword(email)

    }

    return(
        <div className="container">
        <div>
          <Navbar />
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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