//* All the AXIOS API calls will be made from here to the backend
//* These functions will be exported and then imported wherever needed

import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const apiURL = [
  "https://milan-jwoc.herokuapp.com",
  "http://localhost:8000",
  "https://milan-server.vercel.app",
  "https://milan-server.adaptable.app",
];
const API = apiURL[1];

const User_Log = `${API}/user/login`;
const User_Reg = `${API}/user/register`;
const User_Updt = `${API}/user/update`;
const Club_Updt = `${API}/club/update`;
const Club_Log = `${API}/club/login`;
const Get_Club_Donations = `${API}/club/getdonations`;
const Get_Club_Events = `${API}/club/getevents`;
const Club_Reg = `${API}/club/register`;
const All_Clubs = `${API}/display/allClubs`;
const Report_Log = `${API}/user/userreport`;

const All_Events = `${API}/display/allevents`;
const Contact_Us = `${API}/user/contactus`;
const Create_Event = `${API}/club/createevent`;

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//* Axios call to login a User
//* IF sucess we alert user made else we alert user failed
//* we get the credentials from the Awb.jsx

//* UPDATE USER
export const UpdateUser = async (credentials) => {
  try {
    const response = await Axios.post(User_Updt, credentials);
    const success_message = response.data.message;
    if (success_message) {
      alert(success_message);
      return response;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};

//* UPDATE USER
export const UpdateClub = async (credentials) => {
  try {
    const response = await Axios.post(Club_Updt, credentials);
    const success_message = response.data.message;
    if (success_message) {
      alert(success_message);
      return response;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};

//* LOGIN USER
export const LoginUser = async (credentials) => {
  try {
    const User = await Axios.post(User_Log, credentials);
    return User;
  } catch (error) {
    toast.error(error.response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

//* REGISTER USER
export const RegisterUser = async (credentials) => {
  try {
    const response = await Axios.post(User_Reg, credentials);
    toast('🦄 Registered your account !', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      onClose: () => {
        navigate('/user/login');
      },
    });
  } catch (error) {
    toast.warning(error.response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

//* LOGIN CLUB
export const LoginClub = async (credentials) => {
  try {
    const Post = await Axios.post(Club_Log, credentials);
    return Post;
  } catch (error) {
    toast.error(error.response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

//* REGISTER CLUB
export const RegisterClub = async (credentials) => {
  try {
    const response = await Axios.post(Club_Reg, credentials);
    
    toast('🦄 Registered your club !', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      onClose: () => navigate('/clubs/login'),
    });
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//* GET ALL CLUBS
export const GetAllClubs = async () => {
  try {
    const response = await Axios.get(All_Clubs);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//* REPORT PROBLEMS
export const ReportProblem = async (credentials) => {
  try {
    const response = await Axios.post(Report_Log, credentials);
    if (response.data.success === true) {
      return true;
    } else if (response.data.message === "tryagain") {
      return "tryagain";
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//* GET ALL EVENTS
export const GetAllEvents = async () => {
  try {
    const response = await Axios.get(All_Events);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//* CONTACT
export const Contact = async (formData, toast) => {
  try {
    const response = await Axios.post(Contact_Us, formData);
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

//* CREATE EVENT

export const CreateEvent = async (eventdata, jwtToken) => {
  try {
    eventdata["jwtToken"] = jwtToken;

    const response = await Axios.post(Create_Event, eventdata);
    return response;
  } catch (error) {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(error);
  }
};

// GetClubDonations
export const GetClubDonations = async (jwtToken) => {
  try {
    const response = await Axios.post(Get_Club_Donations, {
      "jwtToken": jwtToken
    });

    return response.data;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

// GetClubEvents
export const GetClubEvents = async (jwtToken) => {
  try {
    const response = await Axios.post(Get_Club_Events, {
      "jwtToken": jwtToken
    });

    return response.data;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};