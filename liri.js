require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('Twitter');
var Spotify = require('node-spotify-api');
var Request = require("request");
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Read in the command line arguments
var cmdArgs = process.argv;

// The LIRI command will always be the second command line argument
var liriCommand = process.argv[2];

var liriArg = '';
for (var i = 3; i < cmdArgs.length; i++) {
  liriArg += cmdArgs[i] + ' ';
}

console.log(liriCommand);
console.log(liriArg);

function tweets() {
  var params = {
  	screen_name: 'bosman0531',
  	count: 20
  	};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    	for (var i = 0; i < tweets.length; i++) {
    		console.log("Tweet: " + tweets[i].text + " \nDate Created: " + tweets[i].created_at + '\n' + '-----------------------');
    	}
    }
  });

}


function spotifySong(song) {
  spotify.search({ type: 'track', query: song, limit : 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      else {
        console.log(data);
        var data = data.tracks.items;

        console.log("Artist: " + data[0].artists[0].name + "\nSong Title: " + data[0].name + "\nPreview: " + data[0].preview_url + "\nAlbum: " + data[0].album.name);
      }
  });
}





