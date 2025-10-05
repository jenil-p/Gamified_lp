const mongoose = require('mongoose');

const userroleSchema = mongoose.Schema({
    role: {type: mongoose.Schema.Types.ObjectId , ref: 'role' ,required: true},
    user: {type : mongoose.Schema.Types.ObjectId , ref: 'user' , required: true},
});

const UserRole = mongoose.model('userrolemapping' , userroleSchema);

module.exports = UserRole;