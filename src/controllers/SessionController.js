const User = require('../models/User');
const jwt = require('jsonwebtoken');

function generateToken(params = {}){
    return jwt.sign({params },process.env.TOKEN_SECREAT, {
        expiresIn:86400,
    });
}


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

        user.password = undefined;
        
        res.header("user_token",generateToken({_id:user._id}));

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

    
        res.header("user_token",generateToken({_id:user._id}));
        

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

        res.header("user_token",generateToken({_id:user._id}));

        return res.status(200).send("ok");        

    }

};