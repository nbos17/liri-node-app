require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('Twitter');
var Spotify = require('node-spotify-api');
var Request = require("request");
var fs = require('fs');
var spotifyKey = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

