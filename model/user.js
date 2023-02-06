// email,password,unique,required,validate
//password - string,required,minimum lenght

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {isEmail} = require("validator")

const userSchema = new Schema({
    email: {type: String,
        required:[true, 'please provide an email'],
        unique:[true,'this email has been registered'],
        Validate: [isEmail, 'please enter a valid email']
        
    },
    password: {
        type: String,
        required:[true, 'please provide an password'],
        minlength: [10, "the minumum password lenght is 10"]

    },
}, 
{ timestamps: true}
);

module.exports =mongoose.model('user',userSchema)
