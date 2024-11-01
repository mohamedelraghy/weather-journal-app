// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// GET route that returns the projectData object
app.get("/all", (req, res, next) => {
  res.status(200).json(projectData);
});

app.post("/add", (req, res, next) => {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };

  res.status(200).json(projectData);
});

// Setup Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running 🚀 on port ${port}`);
});
