require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var nodeArgs = process.argv;

var value = "";

for (var i = 3; i < nodeArgs.length; i++){
    if (i > 3 && i < nodeArgs.length){
        
        value = value + "+" + nodeArgs[i];
    }
};

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

//"spotify-this-song"

function getSong(value) {
    if (value == null) {
        value = "v9SXd0LRQxOaczjL3hbiOQ";
    }
    request("https://api.spotify.com/v  /search?q=" + value + "&type=track", function(error, response, body){
        if (!error && response.statusCode == 200) {
            spotBody = JSON.stringify(body);
            fs.appendFile("log.txt", spotBody + Date());
            console.log(body)
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~\n");
            console.log("Artist: " + spotBody.name);
            console.log("Song: "  );//add song location
            console.log("Album: " ) ; //add album location
            console.log("Link: " ); //add link location
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~\n");

        }  if (error) {
            console.log("error retrieving song: \n" + error);
            fs.appendFile("log.txt", error + Date());
        } else {
            console.log("trouble retrieving songs, try again later");
            fs.appendFile("log.txt", "trouble retrieving songs" + Date());
        }
    });

});

//"movie-this"
function getMovie(value) {
    if (value == null) {
        value = "shakes the clown";
    }
    request("http://www.omdbapi.com/?t=" + value + "&tomatoes=true&y=&plot=short&apikey=4585ce0c");
                if (!error && response.statusCode == 200) {
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
                }                    

         if (error) {
            console.log("error retrieving movie: \n" + error);
            fs.appendFile("log.txt", error + Date());
        } else {
            console.log("trouble retrieving movies, try again later");
            fs.appendFile("log.txt", "trouble retrieving movie" + Date());
    }
};

//"do-what-it-says"

function random() {
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

