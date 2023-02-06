const User = require('../model/user');
const bcrypt = require('bcrypt')



const register = async (req,res) => {
    const {email,password} = req.body
    // we want to be sure that they provide email and password
if(!email || !password) {
    return res.status(400).json({success: false, message: "please provide necessary information"});
}

    // we want to make sure the email has not been registered before
    const userExist = await User.findOne({email})
    if ( userExist){
        return res.status(400).json({success: false, message: "email is in use "})
    }

    //to protect user information  ----- hashing algorithm
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)

    // create the user 

    try {
        const user = await User.create({ email, password: hashedPassword});
        res.status(201).json({success: true, data: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};
//EMAIL AND PASSWORD

const login = async (req,res) => {
    const {email,password} = req.body
    
if(!email || !password) {
    return res.status(400).json({success: false, message: "please provide necessary information"});
}   


    
    //USER HAS REGISTERED
const user = await User.findOne({email})
if(!user){
    return res.status(400).json({success: false, message: "email not found , please go and sign up "})
}


    //PROVIDE THE CORRECT DETAILS, EMAIL AND  PASSWIORD

    const authenticated = user.email === email && (await bcrypt.compare(password,user.password))
    if(authenticated){
        res.status(200).json({succes: true, data: user})
    } else {
        return res.status(401).json({success: false , message: 'invalid email or password'})
    }
};

module.exports = {register, login}