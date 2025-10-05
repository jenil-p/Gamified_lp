const mongoose = require('mongoose');

const cuSchema = new mongoose.Schema({
    class : {type : mongoose.Schema.Types.ObjectId , ref: 'class' , required: true},
    user: {type : mongoose.Schema.Types.ObjectId , ref: 'user' , required: true},
});

const classStudent = mongoose.model('classstudentmapping' , cuSchema);

module.exports = classStudent;