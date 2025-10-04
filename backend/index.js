import dotenv from 'dotenv';
dotenv.config();

<<<<<<< HEAD
import cors from 'cors'
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import userRoute from './routes/Userroute.js';
=======
const express = require('express');
const path = require('path');
const connectMongoDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const cors = require("cors");


const userRoutes = require('./routes/user.route');
const pdfmoduleRoutes = require('./routes/pdf.route');
>>>>>>> 5baedc449f69cce4c5e1c264acf4e537ee9db797

const app = express();
const PORT = process.env.PORT || 3000;

// DB Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({
    origin: "http://localhost:5173", // frontend vite URL
    credentials: true
}));

<<<<<<< HEAD
//yeh cors hai to connect with frontend 
app.use(cors({
  origin: "http://localhost:5173",   // frontend ka  URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
app.use('/api/user', userRoute);

app.get('/', (req, res) => {
  res.send("This is a way to learn through games...");
});

app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
=======
app.use('/user', userRoutes);
app.use('/pdf', pdfmoduleRoutes);

app.get('/', (req, res) => {
    res.send("This is a way to learn through games...")
})

app.listen(PORT, () => console.log(`app listining at PORT:${PORT}`));
>>>>>>> 5baedc449f69cce4c5e1c264acf4e537ee9db797
