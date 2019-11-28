const User = require('../models/User');
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

    

        if(!user.comparePassword(password)){
            return res.status(400).send({error:"Email or Password is wrong"});
        }

    
        const token = await jwt.sign({_id:user._id},process.env.TOKEN_SECREAT);
        
        res.header("user_token",token);
        

        return res.status(200).send("ok");
    },

    async update(req,res){

        //analyze how to do password recovery
        const {token, password} = req.body;

        let _id;

        try {
          _id = jwt.verify(token, process.env.TOKEN_SECREAT)._id;
        } catch(err) {
           console.log(err);
           return res.status(400).send({error:"Token invalied"});
        }
        
        let user = await User.findOne({_id});
        if(!user){
            return res.status(400).send({error:"Email not registed"});
        }

        user.updatePassword(password);

        const user_token = await jwt.sign({_id:user._id},process.env.TOKEN_SECREAT);

        res.header("user_token",user_token);

        return res.status(200).send("ok");        

    }

};