const mongoose = require('mongoose');

const cdSchema = new mongoose.Schema({
    name: {type: String , required: true , unique: true},
})

const classroom = mongoose.model('class' , cdSchema);

module.exports = classroom;