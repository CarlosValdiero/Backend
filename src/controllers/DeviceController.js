const Device = require("../models/Device");
const User = require("../models/User")

const jwt = require('jsonwebtoken');

module.exports ={

    async index(req,res){
        const {user_token} =req.headers;

        try {
            var _id = jwt.verify(user_token, process.env.TOKEN_SECREAT)._id;
        } catch(err) {
            console.log(err);
            return res.status(400).send({error:"Token invalied"});
        }

        const devices = await Device.find({user:_id});


        res.json(devices);

    },

    async show(req,res){
        const {user_token} =req.headers;
        const {id} = req.query;

        try {
            var _id = jwt.verify(user_token, process.env.TOKEN_SECREAT)._id;
        } catch(err) {
            console.log(err);
            return res.status(400).send({error:"Token invalied"});
        }

        const devices = await Device.find({user:_id});


        res.json(devices);

    },

    async store(req,res){
        const {description} = req.body;
        const {user_token} =req.headers;
        
        // bar
        try {
            var _id = jwt.verify(user_token, process.env.TOKEN_SECREAT)._id;
        } catch(err) {
            console.log(err);
            return res.status(400).send({error:"Token invalied"});
         }

        const user = await User.find({_id});
        
        if(!user){
            return res.status(400).send({error:"User does not exist"});
        }

        try {
            const device = await Device.create({
                description,
                user:_id
                
            });
            device.save()
            .then(() => res.json(device))
            .catch(err => res.status(400).json('Error: ' + err));

        } catch (error) {
            console.log(error);
            return res.status(400);
        }      
        
    }
};