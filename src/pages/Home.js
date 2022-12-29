import React from "react";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";

const Home = () => {
  return (
    <div className="container">
      <div>
        <Navbar />
      </div>
      <div className="row">
        <SearchField />
        <div className="navbar fixed-bottom p-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
