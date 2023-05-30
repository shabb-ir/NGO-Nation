//* All routes related to club's LOGIN AND REGISTER

const express = require('express');
const Club = require('../models/ClubsSchema');
const User = require('../models/UserSchema');
const Events = require('../models/EventsSchema');
const router = express.Router();

//* Route 1  - Show all avaialble Users in the DB
router.get('/allusers', async (req, res) => {
  try {
    const allusers = await User.find({});
    res.status(200).json(allusers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// * Route 2 - Show all available Clubs in the DB
router.get('/allclubs', async (req, res) => {
  try {
    const allClubs = await Club.find({});
     res.json(allClubs);
  } catch (error) {
     res.status(500).json({ message: "Internal Server Error" });
     req.json(error);
  }
});

//* Route 3 - Show all the other events
router.get('/allevents', async (req, res) => {
  try {
    const allEvents = await Events.find({});
     res.json(allEvents);
  } catch (error) {
     res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
