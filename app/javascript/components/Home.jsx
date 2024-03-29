import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Main from "./Main.jsx";

export default () => {
  

  return (
    <>
      <Navbar />
      <Main />
      <Footer />
    </>
  )
};