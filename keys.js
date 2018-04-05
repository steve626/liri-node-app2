console.log("this is loaded");

exports.twitter = {
    consumer_key: process.env.twitterConsKey,
    consumer_sectre: process.env.twitterConsSecret,
    access_token_key: process.env.twitterAccTokenKey,
    access_token_secret: process.env.twitterAccTokenSecret,
};

exports.spotify = {
    id: process.env.spotifyId,
    secret: process.env.spotifySecret,

};