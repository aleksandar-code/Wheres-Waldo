import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Main from "../components/Main";

export default () => (
  <>
    <button className="start-btn">PRESS START</button>
    <Navbar />
    <Main />
    <Footer />
  </>
);