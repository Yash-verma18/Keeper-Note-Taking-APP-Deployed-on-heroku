require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/router");

const app = express();
app.use(cors());

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use Router
app.use("/keeper", router);

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  () => {
    console.log("Db is connected");
  },
  (e) => console.error(e)
);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirName, "client", "build", "index.html"))
//   );
// }

// Accessing the path module : for heroku deployement
const path = require("path");

// Step 1: for heroku deployement
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2: for heroku deployement
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
