const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const userModel = require("./models/userModel.js");
const playlistModel = require("./models/playlistModel.js");
const app = express();
const passport = require("passport"),
  SpotifyStrategy = require("passport-spotify").Strategy;

app.use(express.json());
app.use(cors());

const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();


const db = require("./config/keys.js").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

mongoose.set('useFindAndModify', false);

app.listen(port, () => console.log(`Server started on port ${port}`));

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

passport.use(
    new SpotifyStrategy(
      {
        clientID: "6e6168bb4f424095b42f948f1e303b69",
        clientSecret: "d0083b4ff5b743f5888468fe02c2ba9c",
        callbackURL: "http://localhost:5000/auth/spotify/callback"
      },
      function (accessToken, refreshToken, expires_in, profile, done) {
        process.nextTick(function () {
            console.log(profile);
            console.log("accessToken: " + accessToken);
            console.log("refreshToken: " + refreshToken);
            console.log("expires_in: " + expires_in);

            
            spotifyApi.setAccessToken(accessToken);
          return done(null, profile);
        });
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());
  
  app.get(
    "/auth/spotify",
    passport.authenticate("spotify", {
      scope: [      
      "user-read-email",
      "user-read-private",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "user-read-currently-playing",
      "user-follow-read",
      "user-library-read",
      "streaming"
    ],
      showDialog: true,
    })
  );

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/",
    scope: [
      "user-read-email",
      "user-read-private",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "user-read-currently-playing",
      "user-follow-read",
      "user-library-read",
      "streaming"
    ],
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/home");
  }
);

app.post("/api/browse", (req, res) => {

  spotifyApi.getNewReleases({ limit : 15, offset: 0, country: 'US' })
    .then(function(data) {
      console.log(data.body);
        res.send(data.body);
        done();
      }, function(err) {
        console.log("Something went wrong!", err);
      });
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
    userModel.find({ accountType: req.body.accountType }, function (
      err,
      users
    ) {
      res.send(users);
    });
  }
});

app.post("/api/user/ban", (req, res) => {
  let id = req.body.id;
  userModel.findOneAndUpdate({ _id: id }, { accountType: -1 }, function (
    err,
    user
  ) {
    res.send(user);
  });
});

app.post("/api/user/unban", (req, res) => {
  let id = req.body.id;
  userModel.findOneAndUpdate({ _id: id }, { accountType: 0 }, function (
    err,
    user
  ) {
    res.send(user);
  });
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
  playlistModel.findByIdAndUpdate({ _id: id}, { playlist_name: updatedname }, function (
    err,
    playlist
  ) {
    if (err) {
        console.log(err);
    } else {
      console.log("Name processed");
        res.send("Name updated");
    }
  });
});

//POST for deleting playlist
app.post("/api/playlist/delete", (req, res) => {
  let playlist_id = req.body.id;
  let owner_id = req.body.owner;

  playlistModel.findOneAndRemove({ _id: playlist_id }, function (err, playlist) {
    console.log("Delete playlist from playlists collection.");
    if (err) {
      console.log(err);
    }
  });

  console.log("owner_id: " + owner_id);
  console.log("playlist id: " + playlist_id);
  userModel.findById({ _id: owner_id}, function (
    err,
    user
  ) {
    console.log(user.playlists);
    const playlists = user.playlists;
    var index = playlists.indexOf(playlist_id+"");
    playlists.splice(index,1)
    userModel.findByIdAndUpdate({ _id: owner_id}, { playlists: playlists }, function (
      err,
      playlist
    ) {
      if (err) {
          console.log(err);
      } else {
        console.log("Playlist deleted");
      }
    });
    if (err) {
        console.log(err);
    } 
  });
})

//POST for getting playlists of a specific user
app.post("/api/playlist/getplaylists", (req, res) => {
    let owner_id = req.body.id;

      playlistModel.find({ owner_id : owner_id }, function (
        err,
        playlists
      ) {
          if (err) {
              console.log(err);
          } else {
            res.send(playlists);
          }
      });
  });