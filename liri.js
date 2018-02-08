require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('Twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
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


//Twitter api call
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
    else {
      return error;
    }
  });

}

//Spotify api call
function spotifySong(song) {

  var music;

  if (song === "") {
    music = "The Sign Ace of Base";
    console.log(music);
  }
  else {
    music = song;
  }

  spotify.search({ type: 'track', query: music, limit : 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      else {
        //console.log(data);
        var data = data.tracks.items;

        console.log("Artist: " + data[0].artists[0].name + "\nSong Title: " + data[0].name + "\nPreview: " + data[0].preview_url + "\nAlbum: " + data[0].album.name);
      }
  });
}

//omdpapi call
function moveieSearch(query) {

  var search = query;
  if (search === '') {
    search = "Mr. Nobody";
  }
  else {
    search = query;
  }

  search = search.split(' ').join('+');

  var url = "http://www.omdbapi.com/?t=" + search + "&apikey=trilogy";

  request(url, function(error, response, body) {


    if (!error && response.statusCode === 200) {

      //console.log(JSON.parse(body));
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      //console.log("Rotten Tomatoes: " + JSON.parse(body).ratings.source);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
    else {
      return error;
    }
  });

}

//Read txt file
function doWhatSays() {
  fs.readFile('./random.txt', 'utf8', function(error, data) {
    if (error) {
      console.log("ERROR");
    }
    else {
      console.log(data);
      var splitString = data.split(',');
      var first = splitString[0].trim();
      var second = splitString[1].trim();

      if (first === "my-tweets") {
        tweets();
      }
      else if (first === "spotify-this-song") {
        spotifySong(second);
      }
      else if (first === "movie-this") {
        moveieSearch(second);
      }
      else {
        console.log("Please enter a valid command");
      }

    }
  })
}


  


//calling functions

if (liriCommand === "my-tweets") {
  tweets();
}
else if (liriCommand === "spotify-this-song") {
  spotifySong(liriArg);
}
else if (liriCommand === "movie-this") {
  moveieSearch(liriArg);
}
else if (liriCommand === "do-what-it-says") {
  doWhatSays();
}
else {
  console.log("Please enter a valid input");
}





