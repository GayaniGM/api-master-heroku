const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
    // name : String,
    // birthName : String,
    // likeCount : Number,
    // deceased : Boolean,
    // superPowers : [String], //super powers is an string array here
    // movies : [String]

    //Adding validations to the post method

    name:{
        type: String,
        required: true,
    },

    birthName:{
        type: String,
        minlength: 3,
        maxlength: 20
    },

    likeCount:{
        type: Number
       
    },

    deseaces: Boolean,
    superPowers:{
        type: [String],
        enum: ["invisibility", "barking", "Flying"] //validation of the superpower type. we use enum only to use
    },

    movies: [String],
});

const Hero = mongoose.model("Hero", heroSchema)
module.exports = Hero;