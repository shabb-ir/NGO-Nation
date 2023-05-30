import "../../styles/LoginBanner.css";
import picture from "../../assets/pictures/loginBanner.svg";

const LoginBanner = () => {
  return (
    <div className="login-banner-container">
      <img src={picture} alt="login-img" />
      <br />
      <div className="login-banner-content">
        <h1>Welcome to NGO-Social, a place where NGO's Socialise !!</h1>
        <br />
        <p className="inner">Explore more about us !!</p>
        <br />
        <p>
          Join NGOs at their awesome events, help them by sharing some love or explore
          more with the hardworking Organisations !!!
        </p>
        <br />
        <p>Also feel free to Contact us, or report any problem !!</p>
      </div>
    </div>
  );
};

export default LoginBanner;
