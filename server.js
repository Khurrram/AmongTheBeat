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