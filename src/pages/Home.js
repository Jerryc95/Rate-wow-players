import React from "react";

import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";

const Home = () => {
  return (
    <div className="Container m-3">
      <div>
        <Navbar />
      </div>
      <div className="row">
        <SearchField />
      </div>
    </div>
  );
};

export default Home;
