const mongoose = require('mongoose');

const operationSchame = new mongoose.Schema({
    name : {type: String , unique: true , require: true},
})

const Operation = mongoose.model('operation' , operationSchame);

module.exports = Operation;