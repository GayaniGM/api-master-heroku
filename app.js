const express = require("express");
const authentication = require("./middleware/authenticator");
const emailjob = require("./middleware/emailsender");
const mongoose = require("mongoose");
const cors = require("cors");
const heroes = require("./routes/heroes");
const home = require("./routes/home");
const users = require("./routes/users");
const app = express();
const auth = require("./routes/auth");

mongoose.connect("mongodb://localhost/herodb",{
userNewUrlParser:true
})
.then(() => console.log("Connected to database successfully!!!"))
.catch(ex => console.log(ex));

app.use(cors());
app.use(express.json());
app.use(emailjob);
app.use(authentication);
app.use("/", home);
app.use("/api/heroes", heroes); // custom middleware
app.use("/api/users", users);
app.use("/api/auth", auth);

//const PORT = 5000;
//how to run it on heroku
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
