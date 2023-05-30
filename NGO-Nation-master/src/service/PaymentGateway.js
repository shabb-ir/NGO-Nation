import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiURL = [
  "https://milan-jwoc.herokuapp.com",
  "http://localhost:8000",
  "https://milan-server.vercel.app",
  "https://milan-server.adaptable.app",
];
const API = apiURL[1];

export default async function displayRazorpay(money, clubId) {
  console.log(money, clubId);

  const data = await fetch(`${API}/payment/razorpay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "donatedmoney": money["donatedmoney"],
      "clubId": clubId
    }),
  }).then((t) => t.json());

  const options = {
    key: process.env.RAZORPAY_KEY_ID,
    currency: data.currency,
    amount: data.amount,
    name: "NGO-Social",
    description: "A hub for NGOs",
    image: "https://i.ibb.co/JC4g0ZD/favicon.png",
    order_id: data.id,
    handler: function (response) {
      toast("🌈 Thanks for the donation !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log(`Creating donation for ${clubId} of ₹${money["donatedmoney"]}`);
      console.log("PAYMENT ID ::" + response.razorpay_payment_id);
      console.log("ORDER ID :: " + response.razorpay_order_id);

      console.log(`${API}/club/adddonation`);

      fetch(`${API}/club/adddonation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "amount": money["donatedmoney"],
          "clubId": clubId,
          "orderId": response.razorpay_order_id
        }),
      }).then((t) => console.log(t.json()));
    },

    prefill: {
      name: "Saurabh Yelmame",
      email: "saurabh.yelmame@vit.edu",
      contact: "7840912091",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
