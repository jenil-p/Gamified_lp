const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {type : String , required: true},
    courseCode : {type : String , unique: true,},
    tutor : {type: mongoose.Schema.Types.ObjectId , ref: 'user' ,required: true},
    class : {type: mongoose.Schema.Types.ObjectId , ref: 'class' ,required: true},
});

const course = mongoose.model('course' , courseSchema);

module.exports = course;