const mongoose = require('mongoose');

const apptableSchema = new mongoose.Schema({
    tableName : {type : String , unique : true , required: true},
})

const Table = mongoose.model('table' , apptableSchema);