const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
const userModel = require("./models/userModel.js");
const app = express();

app.use(express.json());
app.use(cors());

const db = require("./config/keys.js").mongoURI;

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}` ));
var conn = mongoose.connection;

//GET and POST for Registering
app.get("/api/register", (req, res) => {
    console.log("GET REQUEST completed");
});

app.post("/api/register", (req, res) => {
    console.log(req.body);
    userModel.findOne({$or:[{username: req.body.username},{email: req.body.email}]}, function (err, user){
        console.log(user);
        if (user == null) {
            let id = new mongoose.Types.ObjectId();
            userModel.create({
                _id: id,
                accountType: 0,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            res.send(id + "");
        } else {
            res.send(-1 + "");
        } 
    });
});

app.get("/api/login", (req, res) => {
    console.log("GET REQUEST completed");
});

//GET and POST for Logging In
app.post("/api/login", (req, res) => {
    console.log(req.body);
    userModel.findOne({username: req.body.username, password: req.body.password}, function (err, user){
        console.log(user);
        if (user != null && user.accountType != -1) {
            res.send(user._id + "");
        } else {
            res.send(-1 + "");
        } 
    });
});

//GET and POST for Displaying Users in Admin 
app.get("/api/usersList", (req,res) => {
    console.log("GET REQUEST usersList");
})

app.post("/api/usersList", (req, res) => {
    console.log(req.body);
    if (req.body.accountType == 2) {
        userModel.find({$or:[{accountType: 0},{accountType: -1}]}, function(err, users) {
            res.send(users);
        });
    } else {
        userModel.find({accountType: req.body.accountType}, function(err, users) {
            res.send(users);
        });
    }
});

//GET and POST for banning users in Admin
app.get("/api/user/ban", (req,res) => {
    console.log("GET REQUEST banUser");
})

app.post("/api/user/ban", (req, res) => {
    console.log(req.body.id);
    let id = req.body.id;
    userModel.findOneAndUpdate({'_id': id}, {'accountType': -1}, function(err, user) {
        console.log(user);
        res.send(user);
    });
});


//GET and POST for unbanning users in Admin
app.get("/api/user/unban", (req,res) => {
    console.log("GET REQUEST usersList");
})

app.post("/api/user/unban", (req, res) => {
    console.log(req.body.id);
    let id = req.body.id;
    userModel.findOneAndUpdate({'_id': id}, {'accountType': 0}, function(err, user) {
        console.log(user);
        res.send(user);
    });
});


//GET and POST for removing users in Admin
app.get("/api/user/remove", (req,res) => {
    console.log("GET REQUEST usersList");
})

app.post("/api/user/remove", (req, res) => {
    console.log(req.body.id);
    let id = req.body.id;
    userModel.findOneAndRemove({'_id': id}, function(err, user) {
        console.log(user);
        res.send(user);
    });
});