const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports ={

    async store(req,res){
        const {name, email, password} = req.body;

        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
                name,
                email,
                password
            });
        }

        return res.json(user)
    }

    

};