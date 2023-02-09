require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 7777;
const mongoose = require("mongoose");
const notFound = require("./middleware/notfound");
// const userRouter = require('./routes/userRoutes')
const newRouter = require("./routes/newUserRouter");

const cookieParser = require("cookie-parser");
mongoose.set("strictQuery", true);
app.set("view engine", "ejs");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//ROUTES
app.use(newRouter);
app.get("/signup", (req, res) => {
  res.status(200).render("signup");
});


app.get("/login", (req, res) => {
  res.status(200).render("login");
});




//set cookie
app.get("/example", (req, res) => {
  res.cookie("isAdmin", true);

  // res.send('cookieset');

  //milliseconds
  res.cookie("another", false, {
    maxAge: 8 * 60 * 1000,
    secure: true,
    httpOnly: true,
  });

  res.send("cookies set");
});

app.get("/get", (req, res) => {
  const cookies = req.cookies;
  const { isAdmin } = cookies;
  res.json(cookies);

});

//ERROR ROUTE
app.use(notFound);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
