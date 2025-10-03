require('dotenv').config()

const express = require('express');
const path = require('path');
const connectMongoDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const userRoutes = require('./routes/user.route');
const pdfmoduleRoutes = require('./routes/pdf.route');

const app = express();
const PORT = process.env.PORT ||  3000;

const mongodbUrl = process.env.MONGO_URI;
connectMongoDB(mongodbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static('public'));


app.use('/user' , userRoutes);
app.use('/pdf' , pdfmoduleRoutes);

app.get('/' , (req , res)=>{
    res.send("This is a way to learn through games...")
})

app.listen(PORT , () => console.log(`app listining at PORT:${PORT}`));