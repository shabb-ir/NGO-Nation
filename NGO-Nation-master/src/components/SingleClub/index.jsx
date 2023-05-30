import * as React from 'react';
import ClubUpperImage from '../../assets/pictures/ClubUpperImage.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import displayRazorpay from '../../service/PaymentGateway';

export default function SingleClub({ club }) {
  const [donateclub, setdonateclub] = React.useState("");
  const [money, setmoney] = React.useState({ donatedmoney: 0 });


  const location = useLocation();
  const nav = useNavigate();

  const cardButtonHandler = () => {
    nav('/display/clubs/details')
  }
  const expand = () => {
    document.getElementById(`less${club._id}`).classList.add('hidden');
    document.getElementById(`more${club._id}`).classList.remove('hidden');
  };

  const contract = () => {
    document.getElementById(`more${club._id}`).classList.add('hidden');
    document.getElementById(`less${club._id}`).classList.remove('hidden');
  };

  const handleChange = (e) => {
    setmoney({ ...money, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e, clubId) => {
    e.preventDefault();

    displayRazorpay(money, clubId);
  };
  function removeNonAlphaNumeric(str){
    return str.replace(/[\W_]/g,"");
}

  return (
    <div className= {`card clubCard ${ club.hidden ? "d-none" : "d-block" }`} >
      {/* <img
        className="card-img-top club-img"
        src={ClubUpperImage}
        alt={`${club.name} `}
      /> */}
      <img
        className="card-img-top club-img"
        src={club.image ? club.image : ClubUpperImage}
        alt={`${club.image} `}
      />
      <div className="card-body text-center">
        <h1 className="card-title mb-3">{club.name}</h1>
        <div className="club-info mt-3">
          {/* <p>{club.email}</p> */}
          <p style={{ lineHeight: 1 }} class="text-secondary">📍{club.address}</p>
        </div>

        <div id={`less${club._id}`} className="desc">
          {club.tagLine}
        </div>
        <div id={`more${club._id}`} className="hidden desc">
          {club.tagLine}
          <span className="seeBtn" onClick={contract}>
            See less
          </span>
        </div>

        {location.pathname === '/donateus' && (
          <>
            <button
              type="button"
              className="btn btn-warning donate_btn"
              data-bs-toggle="modal"
              data-bs-target={"#" + removeNonAlphaNumeric(club.name) + "Modal"}
            >
              Donate
            </button>
            {/* <button type="button" className="btn btn-warning donate_btn" onClick={displayRazorpay}> Donate </button> */}
            <div
              className="modal fade"
              id={removeNonAlphaNumeric(club.name) + "Modal"}
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="false"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title" id="staticBackdropLabel">
                      Select any amount that you would donate !
                    </h2>

                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      All of the money you donate, goes directly to the club <b>{(club.name)}</b>
                    </p>

                    <div className="modal-body_amountdiv">
                      <h2>₹</h2>
                      <input
                        type="number"
                        name="donatedmoney"
                        id="donateamount"
                        value={money.donatedmoney}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-dismiss="modal"
                      onClick={(e) => {
                        handleSubmit(e, club._id);
                      }}
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
