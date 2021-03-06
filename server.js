// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port, listening);

function listening(){
    console.log(`listining on port: ${port}`);
};

// setup get route
app.get('/returnData',returnData);

function returnData(req, res){
    res.send(projectData);
}

// setup post route
app.post('/sendData', sendData);

function sendData(req, res){
    projectData['projectData'] = req.body;
}