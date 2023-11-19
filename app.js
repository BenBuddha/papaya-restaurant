const express = require("express");
const mongoose = require("mongoose");
const Meny = require("./models/meny");
const menuRouter = require("./routes/menyer");
const methodOverride = require("method-override");

//My first change
//Boobies!

// Login & register Auth Dependencies
const session = require("express-session");
const app = express();

//Connect to the database
mongoose.connect(
  "mongodb+srv://Benskh081:WqBUFdvmo3R0Y8bD@benskdb.h6scw.mongodb.net/benskDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// Show message if connected succesfully
mongoose.connection
  .once("open", () => console.log("Connected!"))
  .on("error", (error) => {
    console.log("Your Error", error);
  });

// Using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use("/public", express.static("public"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const meny = await Meny.find();
  res.render("index", { meny: meny });
});
//We tell this code to access our forms through our
//request variab (inside of our post method)
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());

app.use(
  session({
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: true,
  })
);

//This is by no means a secure solution at all and it is very easy for any one to get around this.
//Due to time constraints, the site needed to go live ASAP. Besides there's no sensitive information other than food menu
//wich gets changed by weekly/daily basis.
//The Session termination resets on browser close
//A secure build replacing this one is in the plans
app.get("/admin", async (req, res) => {
  //Password Protect Admin Router
  const reject = () => {
    res.setHeader("www-authenticate", "Basic");
    res.sendStatus(401);
  };

  const authorization = req.headers.authorization;

  if (!authorization) {
    return reject();
  }

  const [username, password] = Buffer.from(
    authorization.replace("Basic ", ""),
    "base64"
  )
    .toString()
    .split(":");

  if (!(username === "admin" && password === "papaya66")) {
    return reject();
  }
  //end of auth
  const meny = await Meny.find();
  res.render("admin", { meny: meny });
});
app.get("/logout", function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

app.get("/veckans-meny", async (req, res) => {
  const meny = await Meny.find();
  res.render("veckans-meny", { meny: meny });
});

app.get("/julbord", async (req, res) => {
  res.render("julbord");
});

app.get("/kontakt", (req, res) => {
  res.render("kontakt");
});

app.get("/bestallning", (req, res) => {
  res.render("bestallning");
});

app.get("/logout", (req, res) => {
  res.render("logout");
});

app.use("/admin", menuRouter);

PORT = process.env.PORT || 5300;
app.listen(PORT);
console.log("App running at http://localhost:5300");
// Hi
