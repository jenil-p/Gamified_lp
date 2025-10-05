const User = require('../models/User.model');
const Role = require('../models/Role.model');
const UserRole = require('../models/userRole.model');

async function assignRoleToUser(req , res) {
    const {role , userAssign} = req.body;

    const isUser = await User.findOne({_id : userAssign});
    if(!isUser){
        return res.status(404).json({message : "no such user found !"});
    }

    const isRole = await Role.findOne({_id : role});
    if(!isRole){
        return res.status(404).json({message : "no such role found !"});
    }

    const isAlreadyAssigned = await UserRole.findOne({role : role , user : userAssign});

    if(!isAlreadyAssigned){
        await UserRole.create({
            role : role,
            user : userAssign
        })
        return res.status(400).json({message : "User assigned to this role."});
    }else{
        return res.status(409).json({message : "this user is already assigned to this role !"});
    }
}

async function takeRoleFromUser(req , res) {
    const { entry } = req.body;

    const findEntry = await UserRole.findOne({_id : entry});
    if(!findEntry){
        return res.status(404).json({message : "no such entry here"});
    }
    await UserRole.findByIdAndDelete(entry);
    return res.status(400).json({message : "user de-assigned from this role !"});
}

module.exports = { assignRoleToUser, takeRoleFromUser };