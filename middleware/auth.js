const jwt = require("jsonwebtoken");
const Users = require('../model/user')

//able to check token, access token
// be able to get token verified

const requiredAuthPrcocess = (req, res, next) => {
  //get access to the cookie

  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err,decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        const user = await Users.findById(decodedToken.id)
        res.locals.email = user.email;
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};


module.exports = requiredAuthPrcocess