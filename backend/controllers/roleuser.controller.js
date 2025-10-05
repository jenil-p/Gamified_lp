const User = require('../models/User.model');
const Role = require('../models/Role.model');
const UserRole = require('../models/userRole.model');

async function assignRoleToUser(req , res) {
    const {role , userAssign} = req.body;

    const isUser = await User.findOne({instituteMail : userAssign});
    if(!isUser){
        return res.status(404).json({message : "no such user found !"});
    }

    const isRole = await Role.findOne({role : role});
    if(!isRole){
        return res.status(404).json({message : "no such role found !"});
    }
    const isAlreadyAssigned = await UserRole.findOne({role : isRole._id , user : isUser._id});

    if(!isAlreadyAssigned){
        await UserRole.create({
            role : isRole._id , user : isUser._id
        })
        return res.status(400).json({message : "User assigned to this role."});
    }else{
        return res.status(409).json({message : "this user is already assigned to this role !"});
    }
}

async function takeRoleFromUser(req , res) {
    const { UserToDeassignEmail , roleName } = req.body;

    const role = await Role.findOne({role : roleName});
    const user = await User.findOne({instituteMail : UserToDeassignEmail});

    const findEntry = await UserRole.findOne({role : role._id , user : user._id});
    if(!findEntry){
        return res.status(404).json({message : "no such entry here"});
    }
    await UserRole.findByIdAndDelete(findEntry._id);
    return res.status(400).json({message : "user de-assigned from this role !"});
}

module.exports = { assignRoleToUser, takeRoleFromUser };