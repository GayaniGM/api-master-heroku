const express = require("express");
const router = express.Router();

//importing the model user
const User = require("../models/user");

router.post("/", async (req,res) => {
//create user and save to db

let userToBeCreated = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
});

//save user details to the db
await userToBeCreated.save();
return res.send({
    username: userToBeCreated.username,
    email: userToBeCreated.email
})

});


module.exports = router;