import express from 'express';
import { registeruser, loginuser } from '../Controller/Usercontroller.js';

const userrouter = express.Router();

// Public Routes
userrouter.post('/register', registeruser);
userrouter.post('/login', loginuser);

export default userrouter;
