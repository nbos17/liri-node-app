require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('Twitter');
var Spotify = require('node-spotify-api');
var Request = require("request");
var fs = require('fs');
var spotifyKey = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Read in the command line arguments
var cmdArgs = process.argv;

// The LIRI command will always be the second command line argument
var liriCommand = process.argv[2];

console.log(liriCommand);

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});