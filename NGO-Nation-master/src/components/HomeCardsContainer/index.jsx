import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../styles/HomeCardsContainer.css";
import cuate from "../../assets/pictures/cuate.png";
import pana from "../../assets/pictures/pana.png";
import bgBottom from "../../assets/pictures/bg-bottom.png";

const HomeCardsContainer = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div id="body-section">
      <img
        className="img_0"
        src={pana}
        alt=""
        data-aos="fade-right"
        data-aos-duration="500"
      />

      <div
        className="contents content_0"
        data-aos="fade-left"
        data-aos-duration="500"
      >
        <div className="container">
          <h1 className="content_head">DESCRIPTION </h1>

          <hr className="new1" />

          <h2 className="content_head2">Help NGOs to Reach better </h2>

          <p className="content_p">
            It is a platform where we try and bring together all the various
            NGOs and Clubs and potential donors across the world and connect
            them to the right communities so that people like you and I can send
            and receive help to and from our desired communities. Not only this, the NGOs can also ask for human assistance.
          </p>
        </div>
      </div>

      <div
        className="contents content_1"
        data-aos="fade-right"
        data-aos-duration="500"
      >
        <div className="container">
          <h1 className="content_head">WE CONNECT PEOPLE</h1>

          <hr className="new1" />

          <h2 className="content_head2">
            NGO-Social will connect more than a million people.
          </h2>

          <p className="content_p">
            Together, we see a world where people unite and take action to
            create lasting change – across the globe, in our communities, and in
            ourselves. Through the platform, the reach of the NGOs will go out to a much larger audience.
          </p>
        </div>
      </div>

      <img
        className="img_1"
        src={cuate}
        alt=""
        data-aos="fade-left"
        data-aos-duration="500"
      />

      <img src={bgBottom} alt="" id="bg-bottom" />
    </div>
  );
};

export default HomeCardsContainer;
