import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import '../../styles/EventCreate.css';
import Events from '../../assets/pictures/CreateEventsPic.svg';
import { CreateEvent } from '../../service/MilanApi';
import Cookies from 'js-cookie';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventCreate() {
  const [eventdetails, seteventdetails] = useState({
    eventname: '',
    eventdate: '',
    eventtime: '',
    eventlocation: '',
    eventdescription: '',
  });

  const handleChange = (e) => {
    seteventdetails({ ...eventdetails, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const eventresponse = await CreateEvent(eventdetails, Cookies.get("club"));

    if (eventresponse.status === 200) {
      toast('🌈 Adding your Event !', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        onClose: () => {
          seteventdetails({
            eventname: '',
            eventdate: '',
            eventtime: '',
            eventlocation: '',
            eventdescription: '',
          });
        },
      });
    }
  };

  return (
    <>
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
      />

      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src={Events} width="90%" alt="profile-img"></img>
            </div>

            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form style={{ width: 'auto' }}>
                <h1 className="eventCreateWelcome">
                  Create an event for your club
                </h1>
                <div className="form-outline">
                  <input
                    type="text"
                    className="eventCreateFormInput form-control "
                    id="eventName"
                    name="eventname"
                    required
                    placeholder="What's your event called?"
                    value={eventdetails.eventname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline">
                  <input
                    type="text"
                    className="eventCreateFormInput form-control form-control-md"
                    id="eventdate"
                    name="eventdate"
                    required
                    placeholder="Date of the event?"
                    value={eventdetails.eventdate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline">
                  <input
                    type="text"
                    className="eventCreateFormInput form-control form-control-md"
                    id="eventtime"
                    name="eventtime"
                    required
                    placeholder="Time of the event? (24 Hours format, IST)"
                    value={eventdetails.eventtime}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline">
                  <input
                    type="text"
                    className="eventCreateFormInput form-control form-control-md"
                    id="eventlocation"
                    name="eventlocation"
                    required
                    placeholder="Where will the event take place?"
                    value={eventdetails.eventlocation}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline">
                  <textarea
                    type="text"
                    className="eventCreateFormInput form-control form-control-lg"
                    id="eventTime"
                    name="eventdescription"
                    placeholder="Tell us something more about the event"
                    value={eventdetails.eventdescription}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn  eventCreateSubmit"
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  Create
                </button>
                <br></br> <br></br>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
