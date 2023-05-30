// This is the donate page where we come and select clubs to donate an amount !

import React, { useEffect, useState } from "react";
import donate_image1 from "../assets/pictures/donate_image1.svg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SingleClub from "../components/SingleClub";
import { GetAllClubs } from "../service/MilanApi";
import "../styles/Donate.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  document.title = "NGO-Social | Donate the needy";

  const [clubData, setClubData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn] = useState(Cookies.get("token"));
  var navigate = useNavigate();

  useEffect(() => {
    const fetchClubData = async () => {
      setLoading(true);
      const response = await GetAllClubs();
      setClubData(response);
      setLoading(false);
    };
    fetchClubData();
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  // Redirect user to login page if they are not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in before donating");
      navigate("/user/login");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <>
      <Helmet>
        <title>NGO-Social | Donations</title>
        <meta
          name="description"
          content="Welcome to the donations page, even a small amount can help folks struggling out there."
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />

      <div id="donate_banner" className="container">
        <div id="donateCol2">
          <img src={donate_image1} alt="" className="donate_img" />
        </div>

        <div
          id="donatecol_1"
          className="d-flex flex-column justify-content-center align-items-start me-5"
        >
          <h1 className="mb-4">Yes, you help live !!</h1>
          <p>
            Donations does play an important part as annual funds for the NGOs, donations
            from your ends helps thousands of unfortunate people live their
            lives.{" "}
          </p>{" "}
          <p>
            Choose any club, donate whatever you want, even 5 rupees helps !
          </p>
        </div>
      </div>

      <hr className="container" />

      <div className="container my-5">
        <div className="cards justify-content-center">
          {loading ? (
            <Loading />
          ) : (
            <>
              {clubData.map((club) => {
                return <SingleClub key={club._id} club={club} />;
              })}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donate;
