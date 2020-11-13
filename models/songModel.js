var mongoose = require('mongoose')
var Schema = mongoose.Schema

const songSchema = new Schema({
    _id: Schema.Types.ObjectId,
    song_name: {
        type: String,
        required: [true, "Enter song name"]
    },
    artist_name: {
        type: String,
        required: [true, "Enter artist name"]
    },
    SpotifyURI: {
        type: String,
        required: [true, "Enter SpotifyURI"]
    }
});

const Song = mongoose.model('Song', playlistSchema, 'Songs');

module.exports = Song;