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

function tweets() {

var params = {
	screen_name: 'bosman0531',
	count: 20
	};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < tweets.length; i++) {
  		console.log("Tweet: " + tweets[i].text + " Date Created: " + tweets[i].created_at + '\n' + '-----------------------');
  	}
  }
});

}