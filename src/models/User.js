const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
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


module.exports = mongoose.model("User",UserSchema);