const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    description:{
        type: String,
        required:true
    },
    user:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
        
}, {timestamps: true});

module.exports = mongoose.model("Device",DeviceSchema);