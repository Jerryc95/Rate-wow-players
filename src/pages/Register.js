import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../Context/Auth";

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async () => {
    const users = await auth.getUsers();
    if (users.some(user => user.username === username)) {
      console.log(users.map((user) => user.username));
      console.log([username]);
      setAlertMessage("Username already exists.");
    } else if (users.some(user => user.email === email)) {
      console.log(users.map((user) => user.email));
      console.log([email]);
      setAlertMessage("An account is already associated with that email.");
    } else {
      const signUp = await auth.signUp(email, username.toLowerCase, password);
      if(auth.user) {
        setAlertMessage("Account created! Please check your email to confirm your account.")
      }
      console.log(signUp.message);
      switch (signUp.message) {
        case "Password should be at least 8 characters":
          setAlertMessage("Password must be 8 characters long.");
          break;
        case "Unable to validate email address: invalid format":
          setAlertMessage("Please use a valid email address.");
          break;
        default:
      }
    }

    // if(signUp) {
    //     console.log(signUp.message)
    //     setErrorMessage('Unable to create account. please try again later.')
    // } else if(signUp.session === null) {
    //   setErrorMessage('Account already exists with email.')
    // } else {
    //   setErrorMessage('Please confirm your email.')
    // }
    setEmail("");
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (auth.user) {
      return navigate("/login");
    }
  }, []);

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
          <h3 className="white-text">Create an account below</h3>
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
            <label className="text-muted">Create a username</label>
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
        <span className="text-danger d-flex justify-content-center">
          {alertMessage}
        </span>
        <div className="d-flex justify-content-center p-2">
          
          <button className="btn btn-dark" type="button" onClick={createUser}>
            Sign Up
          </button>
      
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
