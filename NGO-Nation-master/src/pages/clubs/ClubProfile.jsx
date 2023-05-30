import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import comingsoon from '../../assets/pictures/comingsoon.svg'
import Navbar from '../../components/Navbar'
import Cookies from "js-cookie";
import { UpdateClub, UpdateUser, GetClubDonations, GetClubEvents } from '../../service/MilanApi';
import '../../styles/UserLogin.css';
import { useEffect } from 'react';
import donateImg from "../../assets/pictures/donate-banner.png";
import eventImg from "../../assets/pictures/pana.png";


const ClubProfile = () => {
    document.title = "NGO-Social | Club Profile";
    const Navigate = useNavigate()

    const handleLogout = () => {
        window.alert("Logout successful !")
        Cookies.remove("club");
        Navigate("/clubs/login")       
    }

    const [donations, setDonations] = useState([]);
    const [events, setEvents] = useState([]);


    useEffect(() => {
        GetClubDonations(Cookies.get("club"))
        .then((data) => {
            console.log(data["data"]);
            setDonations(data["data"]);
            console.log(donations);

        }) 
        .catch((err) => console.error(err));

        GetClubEvents(Cookies.get("club"))
        .then((data) => {
            console.log(data["data"]);
            setEvents(data["data"]);
            console.log(donations);

        }) 
        .catch((err) => console.error(err));
    }, []);



    const [isEmailValid, setIsEmailValid] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (
            e.target.name === 'email' &&
            e.target.value.match('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
        ) {
            setIsEmailValid(true);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Updating...');
        const Data = UpdateClub(credentials);

        Data.then((response) => {
        if (response?.data.message) {
            handleLogout();
        } else {
            setCredentials({ email: '', oldPassword: '', newPassword: '' });
        }
        });
  };

    return (
        <>
            <Navbar />
            <section className="">
                <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                    <img
                        src="https://www.getillustrations.com/packs/plastic-illustrations-scene-builder-pack/scenes/_1x/accounts%20_%20man,%20workspace,%20desk,%20laptop,%20login,%20user_md.png"
                        className="img-fluid"
                        alt="Phone"
                    />
                    </div>

                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form style={{ width: 'auto' }} onSubmit={handleSubmit}>
                        <h1 style={{ letterSpacing: '1px', marginBottom: '2rem' }}>
                        Update Club profile
                        </h1>
                        <div className="form-outline mb-4">
                        <label
                            htmlFor="email"
                            className="col-form-label col-form-label-lg"
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                        >
                            Enter email address
                        </label>
                        <input
                            type="email"
                            className="form-control form-control-lg remove_placeholder_desktop"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div className="form-outline mb-4">
                        <label
                            htmlFor="oldPassword"
                            className="col-form-label col-form-label-lg"
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                        >
                            Enter previous password
                        </label>
                        <input
                            type="password"
                            className="form-control form-control-lg remove_placeholder_desktop"
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="Previous Password"
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                            value={credentials.oldPassword}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div className="form-outline mb-4">
                        <label
                            htmlFor="newPassword"
                            className="col-form-label col-form-label-lg"
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                        >
                            Enter new password
                        </label>
                        <input
                            type="password"
                            className="form-control form-control-lg remove_placeholder_desktop"
                            id="newpPassword"
                            name="newPassword"
                            placeholder="New Password"
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                            value={credentials.newPassword}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <br />
                        <div className="btn-container-flex btn-container-flex-desktop">
                        <button
                            type="submit"
                            className="btn btn-lg btn-block"
                            disabled={
                            credentials.newPassword.length <= 4 ||
                            credentials.oldPassword.length <= 4 ||
                            !isEmailValid
                            }
                            style={{
                            backgroundColor: '#89b5f7',
                            margin: 10,
                            marginLeft: 0,
                            }}
                        >
                            Update
                        </button>
                        <br />
                        <button
                            onClick={handleLogout}
                            className="btn btn-lg btn-block"
                            style={{ backgroundColor: '#89b5f7' }}
                        >
                            Logout
                        </button>
                        </div>
                        <br></br> <br></br>
                    </form>
                    </div>
                </div>
                </div>
            </section>


            <section className='container'>
                <h2 className='me-0'>Events</h2>
                <div className='container main-card-container pt-4'>
                    <div className='cards'>
                        {events.map((event) => {
                            return <div className="card clubCard py-3" >
                                    <img
                                    src={eventImg}
                                    className="card-img-top club-img"
                                    alt={`fdsf `}
                                    />
                                    <div className="card-body text-center">
                                    <h1 className="card-title">{event["Eventname"]}</h1>
                                    <div className="club-info mt-3">
                                        <p className='text-dark'>📍{event["Eventlocation"]}</p>
                                        <p className='fw-bold fst-italic'>{event["Eventdate"]}</p>
                                        <div className='text-secondary text-truncate'>{event["Eventdescription"]}</div>
                                        
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>


            <section className='container'>
                <h2 className='me-0'>Donations</h2>
                <div className='container main-card-container pt-4'>
                    <div className='cards'>
                        {donations.map((donate) => {
                            return <div className="card clubCard">
                                    <img
                                    src={donateImg}
                                    className="card-img-top club-img"
                                    alt={`fdsf `}
                                    />
                                    <div className="card-body text-center">
                                    <h1 className="card-title">₹{donate["amount"]}</h1>
                                    <div className="club-info mt-3">
                                        <p>{donate["orderId"]}</p>
                                        <p>{donate["createdAt"]}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>


        </>
    )
}

export default ClubProfile