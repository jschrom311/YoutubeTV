const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {basicStrategy, jwtStrategy} = require('./strategies');

const router = express.Router();

const jsonParser = bodyParser.json();

const EntryController = require('./entries');
const UsersController = require('./users');
const AuthController = require('./auth');

//Register User
router.post('/register', jsonParser, UsersController.register);

//Login User
router.post('/login', passport.authenticate('basic', {session: false}), AuthController.login);

//Refresh Token
router.post('/refresh', passport.authenticate('jwt', {session: false}), AuthController.refresh);

//Add Entry
router.post('/add', [passport.authenticate('jwt', {session: false}), jsonParser],UsersController.addEntry);

module.exports = {router, basicStrategy, jwtStrategy};

/*const waze = require('waze-traffic');
 
waze.getTraffic({
    top: '-6.89206',
    right: '107.64529',
    bottom: '-6.89883',
    left: '107.63186',
}).then(info => {
    console.log(info);
});

var waze = require("waze");
 
var wazeLogin = {
  user_id: "myusername",
  password: "mypassword"
}
 
waze.createClient(wazeLogin, function(err, client) {
  
  client.trips.get(function(err, trips) {
 
    console.log("trip count: ", trips.length);
 
    var lastTrip = trips.shift();
    console.log("lastTrip: ", lastTrip);
 
    client.trip.get(lastTrip.id, function(err, trip){
      trip.forEach(function(segment){
        console.log("trip segment detail: ", segment);
      });  
    });
 
  });
});*/