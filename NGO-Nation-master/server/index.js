const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
connectToMongo();
const app = express();
let port = process.env.PORT || 5000;
// console.log(process.env);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO FROM HOME");
});

//* user routes
app.use("/user", require("./routes/User"));

//* club routes
app.use("/club", require("./routes/Clubs"));

//* Display routes
app.use("/display", require("./routes/Display"));

//* Payment routes
app.use("/payment", require("./routes/Payment"));

app.listen(port, () => console.log("API IS RUNNING 🚀"));
