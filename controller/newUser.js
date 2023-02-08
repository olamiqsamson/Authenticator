const Users = require("../model/user");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  //error messages error code = 11000
  let errors = { email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email is already in use";
    return errors;
  }
  if (err.message === "user is not registered yet") {
    errors.email = "this email has not been registered";
    return errors;
  }
  if (err.message === "Invalid email or password") {
    errors.email = " invalid email or password";
    errors.password = "invalid email or password";
    return errors;
  }
  if (err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //protect user information
    //create the user information
    const user = await Users.create({ email, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({success: false, errors});
    //handling error in the catch block
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide necessary information",
      });
    }
    // email is registered
    const user = await Users.findOne({ email });
    if (user) {
      const authenticated = await bcrypt.compare(password, user.password);
      if (authenticated) {
        return res.status(200).json({ success: true, data: user });
      }
      throw Error("Invalid email or password");
    }
    throw Error("user is not registered yet");
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({success: false, errors});
  }
};

module.exports = { register, login };
