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

        return res.json(user);
    },

    async show(req,res){
        const {email, password} = req.body;

        let user = await User.findOne({email});

        if(!user){
            return res.status(400).send({error:"Email or Password is wrong"});
        }

        if(!bcrypt.compareSync(password,user.password)){
            return res.status(400).send({error:"Email or Password is wrong"});
        }

        const token = await jwt.sign({_id:user._id},process.env.TOKEN_SECREAT);

        res.header("user-token",token);

        return res.status(200).send("ok");
    }

    

};