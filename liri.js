// Hides my personal keys
require("dotenv").config();

// Variables for required packages
var keys = require("./keys");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

