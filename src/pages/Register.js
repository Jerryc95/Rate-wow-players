import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

import supabase from "../Provider/supabase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const createUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    setEmail("");
    setPassword("");
    setUsername("");
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
          <h3 className="white-text">Create an account below</h3>
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
          <div className="form-group justify-content-center">
            <label className="text-muted">
              Create a username
            </label>
            <input
              className="form-control mt-1"
              required="required"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </form>
        <div className="d-flex justify-content-center p-2">
          <Link className="pt-2" to="/profile">
            <button className="btn btn-dark" type="button" onClick={createUser}>
              Sign Up
            </button>
          </Link>
        </div>
        <div className="col pt-2">
          <Link className="text-secondary" to="/forgot">
            <div className="d-flex justify-content-center">
              <span className="">Forgot your password?</span>
            </div>
          </Link>
          <Link className="text-secondary" to="/login">
            <div className="d-flex justify-content-center">
              <span className="">Already have an account? Log In</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
