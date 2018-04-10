require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
//var spotify = require("spotify");
var Spotify = require("node-spotify-api");
fs.writeFile("log.txt", process.argv, (error) => { /* handle error */ });

var client = new Twitter(keys.twitter);
var nodeArgs = "";

var action = process.argv[2];
var nodeArgs = process.argv;

var value = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
          
        value = value + " " + nodeArgs[i];
    } else {

         value += nodeArgs[i];

    };
};

        //console.log(nodeArgs);
        console.log("value: " + value);
        console.log("argv: " + process.argv);
    

//commands

switch (action) {
    case "my-tweets":
    getTweets();
    break;

    case "spotify-this-song":
    getSong();
    break;

    case "movie-this":
    getMovie();
    break;

    case "do-what-it-says":
    getRandom();
    break;
};

//"my-tweets" returns last 20 tweets
function getTweets() {
    var params = {screen_name: "steve626",
                    count: 20};

    client.get("statuses/user_timeline", params, function(error, tweets, response) {

        console.log(tweets);

        //shows tweets if there are no errors and if there is a response
        if (!error && response.statusCode === 200) {         
            console.log("last " + tweets.length + " tweets: " + tweets);
            fs.appendFile("log.txt", tweets + Date());        
        }
            if (error) {
                console.log("error retrieving tweets: \n" + error);
                fs.appendFile("log.txt", error + Date());
            } else {
                console.log("trouble retrieving tweets, try again later");
                fs.appendFile("log.txt", "trouble retrieving tweets" + Date());
        
        };
    }
)};

//"spotify-this-song"

function getSong(value) {
    // if (value == null) {
    //     value = "beat it";    
    // }
    var spotify = new Spotify(keys.Spotify);
    spotify.search({type: "track", query: value }, function(err, data) {
        console.log("getSong: " + value);
        if (!err ) {
            spotBody = JSON.stringify(data);
            fs.appendFile("log.txt", spotBody + Date());
            console.log(data)
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~\n");
            console.log("Artist: " + spotBody.name);
            console.log("Song: "  );//add song location
            console.log("Album: " ) ; //add album location
            console.log("Link: " ); //add link location
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~\n");

        }  if (err) {
            console.log("error retrieving song: " + err);
            fs.appendFile("log.txt", err + Date());
        } else {
            console.log("trouble retrieving songs, try again later");
            fs.appendFile("log.txt", "trouble retrieving songs" + Date());
        }
    });

};

//"movie-this"
function getMovie(value) {
    if (value == null) {
        value = "shakes the clown";
        console.log("value2: " + value);
    }
    request("http://www.omdbapi.com/?t=" + value + "&tomatoes=true&y=&plot=short&apikey=4585ce0c", function(err, body){
                if (!err ) {
                    movieBody = JSON.stringify(body);
                    fs.appendFile("log.txt", movieBody + Date());
                    console.log("\n~~~~~~~~~~~~~~~~~~~~~~\n");
                    console.log("Title: "+ movieBody.Title);
                    console.log("Year Released: " + movieBody.Year);
                    console.log("IMDB Rating: " + movieBody.imdbRating);
                    console.log("Rotten Tomato Rating: " + movieBody.tomatoRating);
                    console.log("Origin Country: " + movieBody.Country);
                    console.log("Native Language: " + movieBody.Language);
                    console.log("Plot: " + movieBody.Plot);
                    console.log("Cast: " + movieBody.Actors);
                    console.log("\n~~~~~~~~~~~~~~~~~~~~~~\n");
                
                console.log("body: " + body);
                
                }

         if (err) {
            console.log("error retrieving movie: \n" + err);
            fs.appendFile("log.txt", err + Date());
        } else {
            console.log("trouble retrieving movies, try again later");
            fs.appendFile("log.txt", "trouble retrieving movie" + Date());
        }
    });
};

//"do-what-it-says"

function getRandom() {
    fs.readFile("random.txt", "utf8", function(error,data){
        if (error) {
            console.log(error);
            fs.appendFile("log.txt", error + Date());
            } else {
                var dataArr = data;
                getSong(dataArr);
            }
    });
};
