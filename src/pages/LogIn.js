import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";

import Navbar from "../components/Navbar";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


  const logInUser = async () => {
    const login = await auth.login(email, password);
    if (login.error) {
      console.log(login.error.message);
      setErrorMessage('Incorrect email or password. Please try again.')
    }
    setEmail("");
    setPassword("");
    

  };
  useEffect(()=> {
    if(auth.user) {
      return navigate('/')
    }
  },[auth.user]);

  return (
    <div className="container">
      <div>
        <Navbar />
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
            <label className="text-muted">Email address</label>
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
            <label className="text-muted">Your Password</label>
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
        <span className="text-danger d-flex justify-content-center">{errorMessage}</span>
        <div className="d-flex justify-content-center p-2">
            <button className="btn btn-dark" type="button" onClick={logInUser}>
              Log in
            </button>
        </div>
        <div className="col pt-2">
          <Link className="text-secondary" to="/forgot">
            <div className="d-flex justify-content-center">
              <span className="">Forgot your password?</span>
            </div>
          </Link>
          <Link className="text-secondary" to="/register">
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
