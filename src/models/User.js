const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const bcrypt = require('bcrypt');
const jtw = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
    }
    
}, {timestamps: true});

UserSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.method("comparePassword", function (password) {
    return bcrypt.compareSync(password,this.password);
});

UserSchema.method("verifiedToken", function (token) {
    return jtw.verify(token,process.env.TOKEN_SECREAT);
});

// ver se da para fazer o update assim
UserSchema.method("updatePassword", function(password){
    this.password =  bcrypt.hashSync(this.password, 10);
});

module.exports = mongoose.model("User",UserSchema);