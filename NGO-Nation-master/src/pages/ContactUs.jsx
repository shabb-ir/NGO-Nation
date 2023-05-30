import React, { useState } from "react";
import "../styles/ContactUs.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import contactImage from "../assets/pictures/contactUs.svg";
import { Contact } from "../service/MilanApi";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {

  const initialState = { firstName: "", lastName: "", email: "", message: "" };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const isEmailValid = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    // validation
    if (!formData.firstName || !formData.lastName || !formData.message) {
      toast.warn("Please fill out all the fields.");
    } else if (!isEmailValid(formData.email)) {
      // Email Validation
      toast.warn("Please provide a correct email.");
    } else {
      Contact(formData, toast);
      setFormData(initialState);
    }
  };

  return (
    <>
      <Helmet>

        <title>NGO-Social | Contact Us</title>
        <meta name="description" content="Welcome to the contact us page, feel free to reach out to us for collaborations and more." />
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />
      <ToastContainer />
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="contact-img col-md-8 col-lg-7 col-xl-6">
              <img src={contactImage} className="img-fluid" alt="Contact-Us" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1 style={{ letterSpacing: "1px", fontSize: "2rem" }}>
                Have something to say?
              </h1>
              <div className="inputs">
                <h1
                  style={{
                    letterSpacing: "1px",
                    marginBottom: "2rem",
                    fontSize: "2rem",
                  }}
                >
                  Reach out to us !
                </h1>
                <label
                  htmlFor="Full Name"
                  className="col-form-label col-form-label-lg"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  Enter your name
                </label>
                <div className="d-flex flex-column flex-md-row name">
                  <input
                    type="text"
                    placeholder="First name"
                    id="firstName"
                    value={formData.firstName}
                    className="userreg_des_firstname form-control form-control-lg me-md-2"
                    onChange={handleChange}
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder="First name"
                    id="firstName"
                    value={formData.firstName}
                    className="userreg_mob_firstname form-control form-control-lg me-md-2"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    id="lastName"
                    value={formData.lastName}
                    className="form-control form-control-lg ms-md-2"
                    onChange={handleChange}
                  />
                </div>
                <label
                  htmlFor="email"
                  className="col-form-label col-form-label-lg"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
                <label
                  htmlFor="message"
                  className="col-form-label col-form-label-lg"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  Enter your message
                </label>
                <textarea
                  type="text"
                  placeholder="Message"
                  id="message"
                  rows="4"
                  cols="50"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="submit-btn btn py-2 mb-3"
                  aria-label="Submit"
                >
                  Just Send
                  <svg
                    style={{
                      height: "20px",
                      width: "20px",
                      transform: "rotate(-40deg)",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      fill="#fffff"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
