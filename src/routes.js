const express = require('express');
const SessionController = require('./controllers/SessionController');
const DeviceController = require('./controllers/DeviceController');

const routes = express.Router();

routes.get('/',(req,res) =>{
   return res.send("hello word");
});

routes.post('/register',SessionController.store);
routes.post('/login',SessionController.show);
routes.post('/restorePassword',SessionController.update);

routes.post('/device',DeviceController.store);
routes.get('/device',DeviceController.index);

module.exports = routes;
