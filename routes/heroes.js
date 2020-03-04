const express = require("express");
const Hero = require("../models/hero");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = "12345678";
// var heroesArray = [
//   {
//     id: 1,
//     name: "Ranjan",
//     superPowers: ["power1", "power2"],
//     likeCount: 100
//   },
//   {
//     id: 2,
//     name: "Aravinda",
//     superPowers: ["liquorPower", "disappearance"],
//     likeCount: 900
//   },
//   {
//     id: 3,
//     name: "Nisal",
//     superPowers: ["TikTok", "blackmail"],
//     likeCount: 1200
//   },
//   {
//     id: 4,
//     name: "Kemila",
//     superPowers: ["Docker", "Girls"],
//     likeCount: 1200
//   }
// ];

// router.get("/", (req, res) => {
//   res.send(heroesArray);
// });

//Get method for Mongo db
//from find specific key we can specify the data that we need to find and from where like in sql. 
//you  can sort data which is receiving
router.get("/", async (req, res) => {
  try{
  let heros = await Hero.find()
  //.sort({ name: "asc"})
  // .limit(5)
  // .select({ name: 1, deceased:1 });
  res.send(heros);
  }
  catch(ex){
    return res.status(500).send(ex.message);
  }
});


//Find from the heroId with mongodb
router.get("/:heroId", async (req, res) => {
  // let userRquestedId = parseInt(req.params.heroId);
  // let requestedHero = heroesArray.find(h => h.id === userRquestedId);
   
  try{
   let requestedHero = await Hero.findById(req.params.heroId);

    //let requestedHero = await Hero.find({ _id: /req.params.heroId });

   // another way to find above
   // Hero.heroId(req.params.heroId);

  if (!requestedHero) {
     return res.status(404).send("Requested Id does not exist on our server");
   }

   return res.status(200).send(requestedHero);
  }
  catch(ex){
    return res.status(404).send(ex.message);
  }

});

router.post("/", async (req, res) => {

  //check token is request headaer and see if the token is valid or not
  const token = req.header("x-jwt-token");
  if(!token){
    return res.status(401).send("Access denied!");
  }

  try{
    jwt.verify(token, SECRET_KEY);
  } catch(e){
    res.send(400).send("Invalid token!");
  }
 

 /* if (!req.body.name) {
    return res.status(400).send("Please check request again!");
  }*/
try{
  let heroAdd = new Hero({

    //POST method to post
    name : req.body.name,
    likeCount : req.body.likeCount,
    deceased : req.body.deceased,
    birthName : req.body.birthName,
    likeCount : req.body.likeCount,
    superPowers : req.body.superPowers,
    movies : req.body.movies,
    imageUrl : req.body.imageUrl

    });

  heroAdd = await heroAdd.save();

  res.send(heroAdd);
  }
  catch(ex) //
  {
    return res.status(500).send(ex.message);
  }

  // let newHero = {
  //   id: heroesArray.length + 1,
  //   name: req.body.name,
  //   superPowers: req.body.superPowers,
  //   likeCount: req.body.likeCount
  // };

  // heroesArray.push(newHero);
  // res.send(newHero);
});

router.put("/:heroId", async(req, res) => {

 // let requestedIdToEdit = parseInt(req.params.heroId);
  if (!req.body.likeCount) {

    return res.status(400).send("Request does not contain all values");

  }

  //First call findById to find the object from db
  //then update it

  let heroToEdit = await Hero.findById(req.params.heroId);
  //let heroToEdit = heroesArray.find(h => h.id == requestedIdToEdit);
  heroToEdit.set({likeCount : req.body.likeCount});
  heroToEdit = await heroToEdit.save();

  if (!heroToEdit) {
    return res.status(404).send("Given Id does not exist");
  }

  heroToEdit.likeCount = req.body.likeCount;
  

  res.send(heroToEdit);

});

router.delete("/:heroId", async(req, res) => {
  
  //let heroToDelete = heroesArray.find(h => h.id == parseInt(req.params.heroId));

  let heroToDelete = await Hero.findOneAndDelete({ _id:req.params.heroId});

  if (!heroToDelete) {
    return res.status(404).send("Given Id does not exist");
  }

   let indexOfHero = heroesArray.indexOf(heroToDelete);
   heroesArray.splice(indexOfHero, 1);
  res.send(heroToDelete);
});

module.exports = router;
