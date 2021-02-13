var express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const userRoute = require("./Classes/Routes/users");
const classRoute = require("./Classes/Routes/classes");

const connectDB = require("./config/db");

require("./auth/google")(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use("/", classRoute);
app.use("/user", userRoute);
app.use(passport.initialize());

app.get("/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/google" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// mongoose.connect(process.env.MongoURI, {
//   useNewUrlParser: true,
//   useFindAndModify: true,
//   useUnifiedTopology: true,
// });

connectDB();

app.listen(process.env.PORT || 4000, function () {
  console.log("Server Started .....");
});
