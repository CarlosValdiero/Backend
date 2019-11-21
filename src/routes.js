const express = require('express');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/',(req,res) =>{
   return res.send("hello word");
});

routes.post('/users',SessionController.store);

module.exports = routes;
