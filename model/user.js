// email,password,unique,required,validate
//password - string,required,minimum lenght

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {isEmail} = require("validator")
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {type: String,
        required:[true, 'please provide an email'],
        unique:[true,'this email has been registered'],
        validate: [isEmail, 'please enter a valid email']
        
    },
    password: {
        type: String,
        required:[true, 'please provide an password'],
        minlength: [10, "the minumum password lenght is 10"]

    },
}, 
{ timestamps: true}
);
// mongoose hook
//function the protect user information before we save 
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt);
    next();

});

module.exports =mongoose.model('user',userSchema)
