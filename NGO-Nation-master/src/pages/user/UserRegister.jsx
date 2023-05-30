import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { RegisterUser } from '../../service/MilanApi';

import SchemaValidator, { msgLocalise } from '../../utils/validation';

//* The styles for Login and Register are essentially same
import '../../styles/UserLogin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

const UserRegister = () => {
  const navigate = useNavigate();

  function Anchor(props) {
    return (
      <div>
        <p>
          {props.para}
          <Link to={props.link}>{props.details}</Link>
        </p>
      </div>
    );
  }

  const [credentials, setCredentials] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    mobile: '',
  });

  const FormDataProto = {
    id: '/SignUpForm',
    type: 'object',
    properties: {
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
      address: { type: 'string' },
      mobile: { pattern: '[0-9]+', minlength: 10 },
    },
    required: [
      'firstname',
      'lastname',
      'email',
      'password',
      'address',
      'mobile',
    ],
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    toast.clearWaitingQueue();
    e.preventDefault();
    var validator = SchemaValidator(FormDataProto, { ...credentials });
    console.log("You are registereddddd....1");
    console.log("creds:",credentials);
    
    if (validator.valid) {
      await RegisterUser(credentials);

      
    } else {
      validator.errors.map(function (e, i) {
        return toast(`${e.path[0]} : ${msgLocalise(e)}`, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
        });
      });
    }
    console.log("You are registereddddd....");
  };

  return (
    <>
      <Helmet>
        <title>NGO-Social | User Register</title>
        <meta
          name="description"
          content="Welcome to the User's registration page. Provide all the needed credentials and join us."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
        limit={1}
      />

      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://www.getillustrations.com/packs/plastic-illustrations-scene-builder-pack/scenes/_1x/accounts%20_%20man,%20workspace,%20desk,%20laptop,%20login,%20user_md.png"
                className="img-fluid userregister_sideimg"
                alt="Phone"
              />
            </div>

            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form style={{ width: 'auto' }} onSubmit={handleSubmit}>
                <h1 className="userregister_header">Join us at NGO-Social !!</h1>
                <div className="form-outline mb-2">
                  <label
                    htmlFor="Full Name"
                    className="col-form-label col-form-label-lg regformlabels"
                  >
                    Enter your name
                  </label>
                  <div className="d-flex flex-column flex-md-row">
                    <input
                      type="text"
                      className="userreg_des_firstname form-control form-control-lg me-md-2"
                      placeholder="First name"
                      name="firstname"
                      value={credentials.firstname}
                      onChange={handleChange}
                      required
                      autoFocus
                      aria-label="First name"
                    />
                    <input
                      type="text"
                      className="userreg_mob_firstname form-control form-control-lg me-md-2"
                      placeholder="First name"
                      name="firstname"
                      value={credentials.firstname}
                      onChange={handleChange}
                      required
                      aria-label="First name"
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg ms-md-2"
                      placeholder="Last name"
                      name="lastname"
                      value={credentials.lastname}
                      onChange={handleChange}
                      required
                      aria-label="Last name"
                    />
                  </div>
                </div>
                {/* //* Email */}
                <div className="form-outline mb-4">
                  <label
                    htmlFor="emailInput"
                    className="col-form-label col-form-label-lg regformlabels"
                  >
                    Email address 📨
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg remove_placeholder_desktop"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    aria-label="Email Adress"
                    required
                  />
                </div>
                {/* //* Password */}
                <div className="form-outline mb-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="col-form-label col-form-label-lg regformlabels"
                  >
                    Password 🔑
                  </label>

                  <input
                    type="password"
                    className="form-control form-control-lg remove_placeholder_desktop"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    aria-label="Password"
                  />
                </div>
                {/* //* Address */}
                <div className="form-outline mb-4">
                  <label
                    htmlFor="address"
                    className="col-form-label col-form-label-lg regformlabels"
                  >
                    Address 🏡
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg "
                    id="address"
                    name="address"
                    placeholder="Address, City, State"
                    value={credentials.address}
                    onChange={handleChange}
                    required
                    aria-label="Adress"
                  />
                </div>
                {/* //* mobile */}
                <div className="form-outline mb-4">
                  <label
                    htmlFor="mobile"
                    className="col-form-label col-form-label-lg regformlabels"
                  >
                    Mobile 📍
                  </label>

                  <input
                    type="number"
                    className="form-control form-control-lg form-input remove_placeholder_desktop"
                    id="mobile"
                    name="mobile"
                    placeholder="Mobile"
                    value={credentials.mobile}
                    onChange={handleChange}
                    required
                    aria-label="Mobile"
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-lg btn-block register-btn btn-container-desktop"
                  style={{ backgroundColor: '#89b5f7' }}
                >
                  Register
                </button>
                <br></br> <br></br>
                <Anchor
                  para="Already have an account? "
                  details="Login here"
                  link="/user/login"
                  className="link-info anchor-container-desktop"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserRegister;
