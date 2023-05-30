//* All routes related to club's LOGIN AND REGISTER

const express = require("express");
const Club = require("../models/ClubsSchema");
const Donation = require("../models/DonationSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Events = require("../models/EventsSchema");
var jwt = require("jsonwebtoken");

//* Route 1  - Club Registration

router.post("/register", async (req, res) => {
  try {
    const data = req.body;

    // const { name, email, password, address, pincode, description, tagLine } =
    //   req.body;
    
    
    const { email } = req.body;
    const existingUser = await Club.findOne({ email: email });      
    if (existingUser) {
      return res.status(409).json({ message: "Account already exists" });
    }
   
    const hashpassword = await bcrypt.hash(data.password, 10);

    const ClubData = Club({
      name: data.name,
      email: data.email,
      image: data.image,
      password: hashpassword,
      address: data.address,
      pincode: data.pincode,
      description: data.description,
      tagLine: data.tagLine,
    });

    await ClubData.save();
    res.status(201).json({ message: "Registration successful, please login" });

  } catch (error) {
     res.status(500).json({ message: "Internal Server Error" });
  }
});

//* ---------------------------------------------------------------------------------------------------------------------------------------------
//* Route 2 - Club Login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Club.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const payload = { Club: { id: existingUser._id } };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      // console.log(token);
      if(err) throw new Error('Something Went Wrong!!');
      res.status(201).json({ token, isuser: false });
    });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

//* Route 3 - Create Event

router.post("/createevent", async (req, res) => {
  try {
    const { eventname, eventlocation, eventdate, eventdescription } = req.body;
    
    const jwtToken = req.body["jwtToken"];
		
    const data = jwt.decode(jwtToken);
    const clubId = data["Club"]["id"];
    console.log(clubId);
    
    const eventData = Events({
      Eventname: eventname,
      Eventdate: eventdate,
      Eventlocation: eventlocation,
      Eventdescription: eventdescription,
      clubId: clubId
    });
    await eventData.save();
    res.status(200).json(eventData);
  } catch (e) {
    // console.log(`Error in creating a event: ${e}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/adddonation", async (req, res) => {
  try {
    const { clubId, amount, orderId } = req.body;
    console.log(req, clubId, amount, orderId);

    const donationData = Donation({
      clubId: clubId,
      amount: amount,
      orderId: orderId
    });

    await donationData.save();
    res.status(200).json(donationData);
  } catch (e) {
    // console.log(`Error in creating a event: ${e}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//* Route 1a - Club Update
router.post("/update", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body
		const existingClub = await Club.findOne({ email: email, })
    if (!existingClub) {
      return res.status(404).json({ message: "Club not found" })
    }
		// User Exists in the database
		const validPassword = await bcrypt.compare(oldPassword, existingClub.password)
    
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials" })
    }
		// Old Password Mathched
    if (newPassword.length < 5) {
      return res.status(406).json({ message: "Password Length must be greater than 5 characters" })
    }
    // Correct Password Length
    
		const newHashedPassword = await bcrypt.hash(newPassword, 10)
		// New Password Hashed
    
		// Updated Club
		const ClubData = {
      name: existingClub.name,
			email: email,
			password: newHashedPassword,
			address: existingClub.address,
			pincode: existingClub.pincode,
      tagLine: existingClub.tagLine,
      description: existingClub.description
		}
    
		await Club.replaceOne({ email: email }, ClubData)
	  res.status(201).json({ message: "Password Updated Successfully" })
	} catch (error) {
		// User Password Updated
     res.status(500).json({ message: "Internal Server Error" })
	}
})


//* Route 1a - Club Donations
router.post("/getdonations", async (req, res) => {
  try {
    console.log(req.body);

    const jwtToken = req.body["jwtToken"];
		
    const data = jwt.decode(jwtToken);
    const clubId = data["Club"]["id"];
    console.log(clubId);
    
    const donations = await Donation.find({ clubId: clubId });
    console.log(donations);

	  res.status(200).json({ message: "Donations found successfully" , data: donations});
	} catch (error) {
		// User Password Updated
     res.status(500).json({ message: "Internal Server Error" })
	}
})


//* Route 1a - Club Events
router.post("/getevents", async (req, res) => {
  try {
    console.log(req.body);

    const jwtToken = req.body["jwtToken"];
		
    const data = jwt.decode(jwtToken);
    const clubId = data["Club"]["id"];
    console.log(clubId);
    
    const events = await Events.find({ clubId: clubId });
    console.log(events);

	  res.status(200).json({ message: "Events found successfully" , data: events});
	} catch (error) {
		// User Password Updated
     res.status(500).json({ message: "Internal Server Error" })
	}
})

module.exports = router;
