import React from "react";

import { Link } from 'react-router-dom';
import { useAuth } from "../Context/Auth";
import HomeButton from "./HomeButton";


const Navbar = () => {
  const auth = useAuth()

  return (
    <nav className="navbar navbar-light" >
      { auth.user ?(
        <>
        <div>
          <ul className="nav justify-content-end">
            <li className="nav-item justify-content-start ps-1"><HomeButton /></li>
          </ul>
        </div>
         <ul className="nav justify-content-end p-3">
         <li className="nav-item pe-1">
         
          <Link to='/Account'>
            <button className="btn btn-light " type="button">
            Account
          </button>
          </Link>
        </li>
        <li className="nav-item ps-1">
          <Link to='/'>
           <button className="btn btn-dark" type="button" onClick={auth.logout}>
            Log Out
          </button>
          </Link>
        </li>
      </ul>
        </>    
      ) : (
        <>
           <div>
        <ul className="nav justify-content-end">
          <li className="nav-item justify-content-start ps-1"><HomeButton /></li>
        </ul>
      </div>
        <ul className="nav justify-content-end p-3">
        <li className="nav-item pe-1">
          <Link to='/login'>
            <button className="btn btn-light " type="button">
            Log In
          </button>
          </Link>
        </li>
        <li className="nav-item ps-1">
          <Link to='/register'>
           <button className="btn btn-dark" type="button">
            Sign Up
          </button>
          </Link>
        </li>
      </ul>
        </>
     
      )}
      
    </nav>
  );
};

export default Navbar;
