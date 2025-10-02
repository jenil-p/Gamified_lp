const { Schema, default: mongoose } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new mongoose.Schema({
    fullname : {type : String , required : true },
    instituteMail : {type: String , required: true , unique : true},
    password : {type : String},
    salt: { type: String},
    role : {type : String , required : true , enum: ["STUDENT", "ADMIN","FACULTY"], default: "STUDENT"},
    contactNumber : {type : Number},
})


userSchema.pre("save", function (next) {
    const user = this;
    
    if (!user.isModified("password")) return;
    
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest('hex');
    
    this.salt = salt;
    this.password = hashedPassword;
    
    next();
});

userSchema.static("matchPasswordAndCreateToken" , async function (instituteMail,password) {
   const user = await this.findOne({ instituteMail });
   if(!user) throw new Error('User not found!');
   
   const salt = user.salt;
   const hashedPassword = user.password;

   const password_entered = createHmac("sha256", salt)
    .update(password)
    .digest('hex');

    if(password_entered !== hashedPassword){
        throw new Error('Incorrect password!');
    }
    const token = createTokenForUser(user);
    return token;
});

const User = mongoose.model('user', userSchema);

module.exports = User;