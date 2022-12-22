import React from "react";

import { Link } from 'react-router-dom';

import supabase from "../Provider/supabase";


const Navbar = () => {

  return (
    <nav>

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
    </nav>
  );
};

export default Navbar;
