// Hides my personal keys
require("dotenv").config();

// Variables for required packages
var keys = require("./keys");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');

// CHALK
var chalk = require('chalk');
// console.log(chalk.blue('Hello world!'));

// Variable for Spotify API
var spotify = new Spotify(keys.spotify);

// Variable for each command
var whatToDo = process.argv[2];

// USE SLICE HERE for titles with more than one word
var userInput = process.argv.slice(3).join(" ");


// SPOTIFY FUNCTION
function spotifyThis() {

    if (userInput === undefined || null) {
        userInput = "Ace of Base";
    }
    
    else {
    
    spotify
        .search({ type: "track", query: userInput, limit: 1})
        .then(function(response) {
            console.log(chalk.red("\n============= ") + chalk.green("S P O T I F Y  T H I S  S O N G ") + chalk.red("============= \n"));
            console.log(chalk.bold("Song Name: ") + JSON.stringify(response.tracks.items[0].name, null, 2));
            console.log(chalk.bold("Artist Name: ") + JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
            console.log(chalk.bold("Album Name: ") + JSON.stringify(response.tracks.items[0].album.name, null, 2));
            console.log(chalk.bold("Preview Link: ") + chalk.blue(JSON.stringify(response.tracks.items[0].preview_url, null, 2)));
            console.log(chalk.red("\n============= ") + chalk.green("S P O T I F Y  T H I S  S O N G ") + chalk.red("============= \n"));
        })
        .catch(function(err) {
            console.log(err);
        });
}};

// DO WHAT IT SAYS FUNCTION

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error,response) {
        if (error) {
            console.log(error);
        } else {
        var response = response.split(",");
        spotifyThis(response);
        }
    });
};

// OMDB FUNCTION
function movieThis() {

    if (userInput === undefined || null) {
        userInput = "Mr. Nobody";
    }
    
    else {

    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    // Testing response is coming in
    // console.log(queryUrl);

    axios.get(queryUrl)
    .then(function(response) {
        // console.log(JSON.stringify(response, null, 2));
        console.log(chalk.green("\n============= ") + chalk.magentaBright("S P O T I F Y  T H I S  S O N G ") + chalk.green("============= \n"));
        console.log("Movie Title: " + JSON.stringify(response.data.Title, null, 2));
        console.log("Release Year: " + JSON.stringify(response.data.Year, null, 2));
        console.log("IMDB Rating: " + JSON.stringify(response.data.Ratings[0].Value, null, 2));
        console.log("Rotten Tomatoes Rating: " + JSON.stringify(response.data.Ratings[1].Value, null, 2));
        console.log("Produced In: " + JSON.stringify(response.data.Country, null, 2));
        console.log("Language: " + JSON.stringify(response.data.Language, null, 2));
        console.log(chalk.green("\n============= ") + chalk.magentaBright("S P O T I F Y  T H I S  S O N G ") + chalk.green("============= \n"));
            })

        .catch(function(error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log ("Error: " + error.message);
            }
            console.log(error.config);
        });

}};

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis()
        break;

    case "concert-this":
        concertThis()
        break;

    case "movie-this":
        movieThis()
        break;

    case "do-what-it-says":
        doWhatItSays()
        break;




}