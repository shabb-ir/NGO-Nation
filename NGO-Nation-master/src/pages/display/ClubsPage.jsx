import React, { useEffect, useState } from 'react';
import SingleClub from '../../components/SingleClub';
import '../../styles/ClubsPage.css';
import clubs_banner from '../../assets/pictures/clubs-banner.svg';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { GetAllClubs } from '../../service/MilanApi';
import Loading from '../../components/Loading';

function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

const ClubsPage = () => {
  const handleForceupdateMethod = useForceUpdate();
  document.title = 'NGO-Social | Clubs';
  const [clubData, setClubData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClubData = async () => {
      setLoading(true);
      const response = await GetAllClubs();
      for(let i=0;i<response.length;i++)
      {
        response[i]["hidden"] = false;
      }
      setClubData(response);
      setLoading(false);
      console.log(response);

    };
    fetchClubData();
    
  }, []);


  const handleSearch = ()=> {
    let searchBar = document.getElementById("searchBar");
    
    for(let i=0;i<clubData.length;i++)
    {
        let element = clubData[i];
        let noteTitleText = element["name"];
        let noteDescText = element["tagLine"];
        console.log("element:",element);

        if (
          noteTitleText.toLowerCase().includes(searchBar.value.toLowerCase()) ||
          noteDescText.toLowerCase().includes(searchBar.value.toLowerCase())
        )
          clubData[i]["hidden"] = false;
        else 
          clubData[i]["hidden"] = true;
        
    }
    setClubData(clubData);
    handleForceupdateMethod();
  }

  return (
    <>
      <Navbar />
      <div id="clubs_banner" className="container">
        <div id="clubsCol2">
          <img src={clubs_banner} alt="clubs banner" className="clubs_img" />
        </div>

        <div
          id="clubscol_1"
          className="d-flex flex-column justify-content-center align-items-start"
        >
          <h1 className="mb-2">Clubs and Communities !</h1>
          <p>
            Here are some clubs you can follow, you can attend club events and
            even get notified about it once you subscribe !
          </p>
        </div>
      </div>

      <hr className="container" />

      
      <div className="container main-card-container">
      <input
        id="searchBar"
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onInput={handleSearch}
      />
        <div id="club-cards" className="cards">
          {loading ? (
            <Loading />
          ) : (
            <>
              {clubData.map((club) => {
                return  <> <SingleClub class="bg-primary" key={club._id} club={club} /> </>;
              })}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClubsPage;
