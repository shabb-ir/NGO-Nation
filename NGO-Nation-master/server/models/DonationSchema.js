const mongoose = require("mongoose");

const DonationSchema = mongoose.Schema({
  clubId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  // },
  orderId: {
    type: String,
    required: true,
  }
},
  {timestamps: true}
);

module.exports = mongoose.model("donations", DonationSchema);
