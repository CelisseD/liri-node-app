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

    if (userInput === "" && process.argv[3] === undefined) {
        userInput = "The Sign Ace of Base";
    }
    
    spotify
        .search({ type: "track", query: userInput, limit: 1})
        .then(function(response) {
            console.log(chalk.green.bgRed("\n============= ") + chalk.green.bold("S P O T I F Y  T H I S  S O N G ") + chalk.green.bgRed("============= \n"));
            console.log(chalk.bold("Song Name: ") + JSON.stringify(response.tracks.items[0].name, null, 2));
            console.log(chalk.bold("Artist Name: ") + JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
            console.log(chalk.bold("Album Name: ") + JSON.stringify(response.tracks.items[0].album.name, null, 2));
            console.log(chalk.bold("Preview Link: ") + chalk.blue(JSON.stringify(response.tracks.items[0].preview_url, null, 2)));
            console.log(chalk.green.bgRed("\n============= ") + chalk.green.bold("S P O T I F Y  T H I S  S O N G ") + chalk.green.bgRed("============= \n"));
        })
        .catch(function(err) {
            console.log(err);
        });
};

// DO WHAT IT SAYS FUNCTION

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error,data) {
        if (error) {
            console.log(error);
        } 
        var dataArr = data.split(",");
        whatToDo = dataArr[0];
        userInput = dataArr[1];
        // console.log(dataArr[1])
        spotifyThis(dataArr[1]);
        
    });

    
};

// OMDB FUNCTION
function movieThis() {

    if (userInput === "") {
        userInput = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    // Testing response is coming in
    // console.log(queryUrl);

    axios.get(queryUrl)
    .then(function(response) {
        // console.log(JSON.stringify(response, null, 2));
        console.log(chalk.white.bgGreen("\n============= ") + chalk.magentaBright.bold("M O V I E  T H I S ") + chalk.white.bgGreen("============= \n"));
        console.log(chalk.bold("Movie Title: ") + JSON.stringify(response.data.Title, null, 2));
        console.log(chalk.bold("Starring: ") + JSON.stringify(response.data.Actors, null, 2));
        console.log(chalk.bold("Release Year: ") + JSON.stringify(response.data.Year, null, 2));
        console.log(chalk.bold("IMDB Rating: ") + JSON.stringify(response.data.Ratings[0].Value, null, 2));
        console.log(chalk.bold("Rotten Tomatoes Rating: ") + JSON.stringify(response.data.Ratings[1].Value, null, 2));
        console.log(chalk.bold("Produced In: ") + JSON.stringify(response.data.Country, null, 2));
        console.log(chalk.bold("Language: ") + JSON.stringify(response.data.Language, null, 2));
        console.log("------------");
        console.log(chalk.bold("Plot: ") + JSON.stringify(response.data.Plot, null, 2));
        console.log(chalk.white.bgGreen("\n============= ") + chalk.magentaBright.bold("M O V I E  T H I S ") + chalk.white.bgGreen("============= \n"));
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

};

// BANDS IN TOWN FUNCTION
function concertThis() {


        var queryUrl = ("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")

        axios.get(queryUrl)
        .then(function(response) {
            console.log(chalk.black.bgYellow("\n============= ") + chalk.cyanBright.bold("C O N C E R T  T H I S ") + chalk.black.bgYellow("============= \n"));
            console.log(chalk.bold("Venue: ") + response.data[0].venue.name);
            console.log(chalk.bold("Location: ") + response.data[0].venue.city + ", " + response.data[0].venue.country);
            console.log(chalk.bold("Event Date: ") + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            console.log(chalk.black.bgYellow("\n============= ") + chalk.cyanBright.bold("C O N C E R T  T H I S ") + chalk.black.bgYellow("============= \n"));
            })
            .catch(function(err) {
                console.log(err);
                  });
        };


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