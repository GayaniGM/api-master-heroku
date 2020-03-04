const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//importing the model user
const User = require("../models/user");
const SECRET_KEY = "12345678";


router.post("/", async (req,res) => {

    //compare password and see if the person is authenticated
    let user = await User.findOne({ email: req.body.email });
    if(!user) {
        return res.status(400).send("Invalid login credentilas!");
    }

    //compare and check if the password is correct or not
    let inValidPwd = user.password == req.body.password;
    if(!inValidPwd){
        return res.status("400").send("Invalid login credentials!");
    }

    //res.send("Nice. I will authenticate you! ")
    let token = jwt.sign({ id: user._id, email: user.email}, SECRET_KEY);
    res.send({
        token: token
    });

});


module.exports = router;