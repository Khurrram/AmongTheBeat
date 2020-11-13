var mongoose = require('mongoose')
var Schema = mongoose.Schema

const playlistSchema = new Schema({
    _id: Schema.Types.ObjectId,
    playlist_name: {
        type: String,
        required: [true, 'Enter a playlist name']
    },
    owner_id: {
        type: String,
        required: [true, "Enter an email"]
    },
    password: Schema.Types.ObjectId,
    private:{
        type: Number,
        required: [true, "Enter private information"]
    },
    songs_ids: {
        type: Array
    }

});

const Playlist = mongoose.model('Playlist', playlistSchema, 'Playlists');

module.exports = Playlist;