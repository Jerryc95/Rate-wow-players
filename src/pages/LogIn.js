import React, { useState } from "react";
import { Link } from 'react-router-dom'

import BackButton from "../components/BackButton";
import supabase from "../Provider/supabase";

const Login = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const signInUser = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: userPassword
        });
        if(error) {
            console.log(error)
        } else {
            console.log(data)
        };
        setUserEmail("");
        setUserPassword("");
    };

  return (
    <div className="container mt-2">
    <div>
      <BackButton />
    </div>
    <div className="row justify-content-center p-5">
      <div className="d-flex justify-content-center p-2">
        <h1 className="font-weight-bold">Rate WoW Players</h1>
      </div>
      <div className="d-flex justify-content-center p-2">
        <h3 className="white-text">Sign in below</h3>
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
        <div className="form-group justify-content-center">
          <label className="text-muted">
            Your Password
          </label>
          <input
            className="form-control mt-1"
            required="required"
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
      </form>
      <div className="d-flex justify-content-center p-2">
        <Link className="pt-2" to="/profile">
          <button className="btn btn-dark" type="button" onClick={signInUser}>
            Log in
          </button>
        </Link>
      </div>
      <div className="col pt-2">
        <Link className="text-secondary" to='/forgot'>
          <div className="d-flex justify-content-center">
            <span className="">Forgot your password?</span>
          </div>
        </Link>
        <Link className="text-secondary" to='/register'>
          <div className="d-flex justify-content-center">
            <span className="">Don't have an account? Sign up</span>
          </div>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Login;
