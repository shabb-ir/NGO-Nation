import React from "react";
import "../styles/AboutUs.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import abtImg from "../assets/pictures/about-pana.png";

export default function AboutUs() {
  document.title = "NGO-Social | About Us";
  return (
    <div>
      <Navbar />
      <div
        id="about"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="abtCol1 me-5">
          <img src={abtImg} alt="" className="abtImg" />
        </div>
        <div className="abtCol2 d-flex flex-column align-items-start ms-5">
          <h1>NGO-Social</h1>
          <p className="mt-4">
          NGO stands for non-governmental organization. While there is no universally agreed-upon definition of an NGO, typically it is a voluntary group or institution with a social mission, which operates independently from the government. NGOs or similar organizations exist in all parts of the world.
          </p>
          <p className="mt-2">
            With NGO-Social we aim at bringing all the various NGOs and donors under
            one single roof to ease the burden of going to find their
            appropriate donors and the appropriate communities to donate to.
            With the help of our search filters and ask platform, it becomes
            easier for the people to find their right community to serve.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
