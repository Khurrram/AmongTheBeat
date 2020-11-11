const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const userModel = require("./models/userModel.js");
const app = express();
var passport = require("passport"),
  SpotifyStrategy = require("passport-spotify").Strategy;
require("dotenv").config();

app.use(express.json());
app.use(cors());

const db = require("./config/keys.js").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
var conn = mongoose.connection;

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:" + port + "/auth/spotify/callback",
    },
    function (accessToken, refreshToken, expires_in, profile, done) {}
  )
);

app.get("/auth/spotify", passport.authenticate("spotify"));

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/login",
    scope: [
      "user-read-email",
      "user-read-private",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "user-read-currently-playing",
      "user-follow-read",
      "user-library-read",
      "streaming",
    ],
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

//GET and POST for Registering
app.get("/api/register", (req, res) => {
  console.log("GET REQUEST completed");
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

//GET and POST for Logging In
app.get("/api/login", (req, res) => {
  console.log("GET REQUEST completed");
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

//GET and POST for Displaying Users in Admin
app.get("/api/usersList", (req, res) => {
  console.log("GET REQUEST usersList");
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

//GET and POST for banning users in Admin
app.get("/api/user/ban", (req, res) => {
  console.log("GET REQUEST banUser");
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

//GET and POST for unbanning users in Admin
app.get("/api/user/unban", (req, res) => {
  console.log("GET REQUEST usersList");
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

//GET and POST for removing users in Admin
app.get("/api/user/remove", (req, res) => {
  console.log("GET REQUEST usersList");
});

app.post("/api/user/remove", (req, res) => {
  let id = req.body.id;
  userModel.findOneAndRemove({ _id: id }, function (err, user) {
    res.send(user);
  });
});

//GET and POST for changing password

app.post("/api/user/checkpass", (req, res) => {
  let id = req.body.id;
  let oldpass = req.body.oldpass;
  let updatedpass = req.body.updatedpass;

  userModel.findOne({ _id: id, password: oldpass }, function (err, user) {
    if (err) {
      console.log(err);
      res.send("Invalid old password");
    } else {
      res.send("Correct password");
    }
  });
});

app.post("/api/user/changepass", (req, res) => {
  let id = req.body.id;
  let updatedpass = req.body.updatedpass;
  userModel.findOneAndUpdate({ _id: id }, { password: updatedpass }, function (
    err,
    user
  ) {
    if (err) {
      console.log(err);
    }
    res.send("Password updated");
  });
});

app.post("/api/user/getusername", (req, res) => {
  let id = req.body.id;
  userModel.findOne({ _id: id }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.send(user.username);
    }
  });
});
