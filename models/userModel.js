var mongoose = require('mongoose')
var Schema = mongoose.Schema

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    SpotifyAuth: {
        type: String
    },
    username: {
        type: String,
        required: [true, 'Enter a username']
    },
    email: {
        type: String,
        required: [true, "Enter an email"]
    },
    password: {
        type: String,
        required: [true, "Enter a password"]
    },
    accountType:{
        type: Number,
        required: [true, "Enter an account type"]
    },
    user_mood:{
        last_update: {type: Date}, 
        mood: {type: String}
    },
    playlists: {
        type: Array
    },
    history: {
        type: Array
    },
    liked_songs:
    {
        type: Array
    }

});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;