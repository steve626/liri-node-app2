console.log("this is loaded");

exports.Twitter = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_sectre: process.env.WTITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.Spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET

};