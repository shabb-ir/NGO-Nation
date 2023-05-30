import React from 'react';
import { useNavigate } from 'react-router-dom';
import BannerBg from '../../assets/pictures/milanBg.jpg';
import '../../styles/Banner.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
  var nav = useNavigate();

  const handleClub = () => {
    nav('/clubs/register');
  };
  const handleUser = () => {
    nav('/user/register');
  };

  return (
    <>
      <div className="banner-container" style={{ backGround: BannerBg }}>
        <div
          className="banner-outer"
          data-aos="fade-up"
          data-aos-anchor=".banner-content"
          data-aos-anchor-placement="bottom-top"
          data-aos-duration="1000"
          data-aos-easing="ease"
          data-aos-once="false"
        >
          <button className="up-btn" onClick={() => window.scrollTo(0, 0)}>
            <div>↑</div>
          </button>
        </div>
        <div className="banner-inner">
          <div className="banner-content justify-content-center">
            <h1 className="banner-header1">NGO-Social</h1>
            <h2 className="banner-subtitle">Where NGOs Socialize and Connect with more people</h2>
          </div>

          <div className="banner-Buttons">
            <button
              id="btn-1"
              type="button"
              className="btn btn-primary banner-Buttons_btn1"
              onClick={() => {
                handleClub();
              }}
            >
              Continue as a Club
            </button>
            <button
              id="btn-2"
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleUser();
              }}
            >
              Continue as a User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
