const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const userModel = require("./models/userModel.js");
const playlistModel = require("./models/playlistModel.js");
const songModel = require("./models/songModel.js");
const app = express();

app.use(express.json());
app.use(cors());

const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi();

const db = require("./config/keys.js").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

mongoose.set("useFindAndModify", false);

app.listen(port, () => console.log(`Server started on port ${port}`));

app.post("/api/browse", (req, res) => {
  spotifyApi.setAccessToken(req.body.curraccessToken);
  spotifyApi.getFeaturedPlaylists({ limit: 15 }).then(
    function (data) {
      res.send(data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});

app.post("/api/openalbum", (req, res) => {
  spotifyApi.setAccessToken(req.body.curraccessToken);
  spotifyApi.getPlaylist(req.body.id).then(function (data) {
    res.send(data.body);
  }),
    function (err) {
      console.log("Something went wrong!, ", err);
    };
});

app.post("/api/searchTracks", (req, res) => {
  spotifyApi.setAccessToken(req.body.curraccessToken);
  const search = "track:" + req.body.search;
  spotifyApi.searchTracks(search).then(function (data) {
    res.send(data.body);
  }),
    function (err) {
      console.log("Something went wrong!, ", err);
    };
});

app.post("/api/register", (req, res) => {
  userModel.findOne(
    { $or: [{ username: req.body.username }, { email: req.body.email }] },
    function (err, user) {
      if (user == null) {
        let id = new mongoose.Types.ObjectId();
        userModel.create({
          _id: id,
          accountType: 0,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        res.send(id + "");
      } else {
        res.send(-1 + "");
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  userModel.findOne(
    { username: req.body.username, password: req.body.password },
    function (err, user) {
      if (user != null) {
        if (user.accountType == -1) {
          res.send("banned");
        } else {
          res.send(user._id + "");
        }
      } else {
        res.send("notFound");
      }
    }
  );
});

app.post("/api/usersList", (req, res) => {
  if (req.body.accountType == 2) {
    userModel.find(
      { $or: [{ accountType: 0 }, { accountType: -1 }] },
      function (err, users) {
        res.send(users);
      }
    );
  } else {
    userModel.find(
      { accountType: req.body.accountType },
      function (err, users) {
        res.send(users);
      }
    );
  }
});

app.post("/api/user/ban", (req, res) => {
  let id = req.body.id;
  userModel.findOneAndUpdate(
    { _id: id },
    { accountType: -1 },
    function (err, user) {
      res.send(user);
    }
  );
});

app.post("/api/user/unban", (req, res) => {
  let id = req.body.id;
  userModel.findOneAndUpdate(
    { _id: id },
    { accountType: 0 },
    function (err, user) {
      res.send(user);
    }
  );
});

//POST for removing users in Admin

app.post("/api/user/remove", (req, res) => {
  let id = req.body.id;
  userModel.findOneAndRemove({ _id: id }, function (err, user) {
    res.send(user);
  });
});

//POST for checking and changing password

app.post("/api/user/changepass", (req, res) => {
  let id = req.body.id;
  let oldpass = req.body.oldpass;
  let updatedpass = req.body.updatedpass;
  userModel.findOneAndUpdate(
    { _id: id, password: oldpass },
    { password: updatedpass },
    function (err, user) {
      if (err) {
        console.log(err);
        res.send("invalid pass");
      } else {
        res.send("Password updated");
      }
    }
  );
});

//POST for creating new playlist
app.post("/api/playlist/createPlaylist", (req, res) => {
  let owner_id = req.body.id;
  let playlist_id = new mongoose.Types.ObjectId();
  playlistModel.create({
    _id: playlist_id,
    playlist_name: "Untitled",
    owner_id: owner_id,
    private: 0,
  });

  userModel.findOneAndUpdate(
    { _id: owner_id },
    { $push: { playlists: playlist_id } },
    function (err, user) {
      if (err) {
        console.log(err);
      }
    }
  );
  res.send(playlist_id);
});

//POST for editing playlist name
app.post("/api/playlist/editname", (req, res) => {
  let id = req.body.id;
  let updatedname = req.body.updatedname;
  console.log("updatedname: " + updatedname);
  console.log("editname is called");
  playlistModel.findByIdAndUpdate(
    { _id: id },
    { playlist_name: updatedname },
    { new: true },
    function (err, playlist) {
      if (err) {
        console.log(err);
      } else {
        console.log("Name processed");
        res.send(playlist);
      }
    }
  );
});

//POST for deleting playlist
app.post("/api/playlist/delete", (req, res) => {
  let playlist_id = req.body.id;
  let owner_id = req.body.owner;

  playlistModel.findOneAndRemove(
    { _id: playlist_id },
    { new: true },
    function (err, playlist) {
      console.log("Delete playlist from playlists collection.");
      if (err) {
        console.log(err);
      }
      res.send(playlist.songs_ids);
    }
  );

  console.log("owner_id: " + owner_id);
  console.log("playlist id: " + playlist_id);
  userModel.findById({ _id: owner_id }, function (err, user) {
    console.log(user.playlists);
    const playlists = user.playlists;
    var index = playlists.indexOf(playlist_id + "");
    playlists.splice(index, 1);
    userModel.findByIdAndUpdate(
      { _id: owner_id },
      { playlists: playlists },
      function (err, playlist) {
        if (err) {
          console.log(err);
        } else {
          console.log("Playlist deleted");
        }
      }
    );
    if (err) {
      console.log(err);
    }
  });
});

//POST for finding the owner that matches a string query
app.post("/api/playlist/getowner", (req, res) => {
  let username = req.body.username;

  userModel.find({ username: username }, function (err, user) {
    if (err) {
      res.send("No User Found");
    } else {
      res.send(user);
    }
  });
});

//POST for getting playlists of a specific user
app.post("/api/playlist/getplaylists", (req, res) => {
  let owner_id = req.body.id;

  playlistModel.find({ owner_id: owner_id }, function (err, playlists) {
    if (err) {
      console.log(err);
    } else {
      res.send(playlists);
    }
  });
});

//POST for getting valid playlists when adding songs
app.post("/api/song/getplaylists", (req, res) => {
  let owner_id = req.body.id;
  let song_name = req.body.song_name;
  let artist_name = req.body.artist_name;
  let uri = req.body.uri;
  let id = new mongoose.Types.ObjectId();
  let songHold;

  playlistModel.find({ owner_id: owner_id }, function (err, playlists) {
    if (err) {
      console.log(err);
    } else {
      songModel.findOne({ SpotifyURI: uri }, function (err, song) {
        songHold = song;
        if (song == null) {
          songModel.create({
            _id: id,
            song_name: song_name,
            artist_name: artist_name,
            SpotifyURI: uri,
          });
          let data = { playlists: playlists, song: id };
          res.send(data);
        } else {
          playlistModel.find(
            { "songs_ids.song_id": song._id },
            function (err, playlist) {
              if (err) {
                console.log(err);
              }
              for (let i = 0; i < playlists.length; i++) {
                for (let j = 0; j < playlist.length; j++) {
                  if (playlists[i]._id + "" === playlist[j]._id + "") {
                    //playlist found
                    playlists.splice(i, 1);
                  }
                }
              }
              let data = { playlists: playlists, song: songHold._id };
              res.send(data);
            }
          );
        }
      });
    }
  });
});

//POST for adding song to playlist
app.post("/api/song/addtoplaylist", (req, res) => {
  let playlist_id = req.body.id;
  let uri = req.body.song_uri;
  const getLength = playlistModel.findById({ _id: playlist_id }); // query for getting length
  const findSong = songModel.findOne({ SpotifyURI: uri }); // query for getting song from songs collection

  getLength.then(function (length) {
    findSong.then(function (song) {
      playlistModel.findOneAndUpdate(
        { _id: playlist_id },
        {
          $push: {
            songs_ids: [{ song_id: song._id, order: length.songs_ids.length }],
          },
        },
        function (err, playlist) {
          if (err) {
            console.log(err);
          } else {
            res.send(playlist_id);
          }
        }
      );
    });
  });
});

//WE ARE NOW USING GET REQUEST PLAYLIST/*
//POST for adding song to playlist
// app.post("/api/playlist/getsongs", (req, res) => {
//   let playlist_id = req.body.id;
//   let songs = []
//     playlistModel.findOne({ _id: playlist_id },
//       function (err, playlist) {
//         if (err) {
//           console.log(err);
//         }
//         else{
//           for (let i = 0; i < playlist.songs_ids.length; i++) {

//             songModel.find({_id: playlist.songs_ids[i].song_id }, function(err,song){
//               if (err) {
//                 console.log(err);
//               }
//                 songs.push(song[0]);
//                 if(i === playlist.songs_ids.length-1)
//                 {
//                   res.send(songs);
//                 }
//             });

//           }

//         }
//       }
//     );
// });

app.post("/api/song/updateplaylist", (req, res) => {
  console.log(req.body.playlistID);

  playlistModel.findByIdAndUpdate(
    { _id: req.body.playlistID },
    { $set: { songs_ids: req.body.song_ids } },
    { new: true },
    function (err, playlist) {
      if (err) {
        console.log(err);
      }
      res.send(playlist);
    }
  );
});

const findSong = async function (params) {
  return await songModel.findOne({ _id: params }).exec();
};

async function findSongArray(songs_ids) {
  var songs = [];
  for (let i = 0; i < songs_ids.length; i++) {
    songs.push(await findSong(songs_ids[i]));
  }
  const promise = await Promise.all(songs);
  return promise;
}

//POST for getting songs from playlist
app.post("/api/playlist/getplaylistsongs", (req, res) => {
  // console.log("in get " + req.query.id);
  let playlist_id = req.body.id;
  playlistModel.findOne({ _id: playlist_id }, function (err, playlist) {
    if (err) {
      console.log(err);
    }

    var songs = [];
    playlistsongs = playlist.songs_ids.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );

    let length = playlist.songs_ids.length;
    for (let i = 0; i < length; i++) {
      songs.push(playlistsongs[i].song_id);
    }

    findSongArray(songs).then(function (result) {
      res.send(result);
    });
  });
});

//POST for removing song from playlist
app.post("/api/song/removefromplaylist", (req, res) => {
  let playlist_id = req.body.id;
  let song_id = req.body.song;
  console.log("song id: " + song_id);
  playlistModel.findById({ _id: playlist_id }, function (err, playlist) {
    const songs = playlist.songs_ids;
    var index = songs.indexOf(song_id + "");
    console.log("index : " + index);
    songs.splice(index, 1);
    console.log("before " + songs);
    playlistModel.findByIdAndUpdate(
      { _id: playlist_id },
      { $set: { songs_ids: songs } },
      { new: true },
      function (err, playlist) {
        if (err) {
          console.log(err);
        } else {
          console.log("after " + playlist.songs_ids);
          res.send(playlist);
        }
      }
    );
    if (err) {
      console.log(err);
    }
  });
});
