const { Router } = require('express');
const User = require('../models/User');

const router = Router();

router.post('/signup' , async(req,res)=>{
    const {fullname, instituteMail, password , role } = req.body;
    await User.create({
        fullname,
        instituteMail,
        password,
        role
    });
    // return res.redirect('/signin');
    return res.json({login : 'true'});
});

router.post('/signin' , async(req,res)=>{
    const {instituteMail , password} = req.body;
    try {
        const token = await User.matchPasswordAndCreateToken(instituteMail,password);
        res.cookie("token" , token);
        console.log('login sucessful...');
        return res.redirect('/');
    } catch (error) {
        return res.render('signin' , {error : 'Incorrect instituteMail or password!'});
    }
});

router.get('/logout' , (req,res)=>{
    res.clearCookie("token");
    return res.redirect('/');
});

module.exports = router;