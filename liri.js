require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var value = process.argv[3];



//commands

switch (action){
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
    client.get("statuses/user_timeline", steve626, 20, function(error, tweets, response){
        //shows tweets if there are no errors and if there is a response
        if (!error && response.statusCode === 200) {         
            console.log("last " + tweets.length + " tweets: " + tweets);
            fs.appendFile("log.txt", Date(), tweets);        
        }
            if (error) {
                console.log("error retrieving tweets: \n" + error);
                fs.appendFile("log.txt", error);
            } else {
                console.log("trouble retrieving tweets");
                fs.appendFile("log.txt", "trouble retrieving tweets" + Date());
        
    });
}

//"spotify-this-song"

function getSong(value) {
    if (value == null) {
        value = "spotify:track:6naxalmIoLFWR0siv8dnQQ";
    }
    request("https://api.spotify.com/v  /search?q=" + value + "&type=track", function(error, response, body){
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.stringify(body);
            
        }
    })

}

//"movie-this"

//"do-what-it-says"

