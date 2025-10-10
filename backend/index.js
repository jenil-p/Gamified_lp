require('dotenv').config()

const express = require('express');
const path = require('path');
const connectMongoDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const cors = require("cors");

// routes import...
const authRoutes = require('./routes/auth.route');
const pdfmoduleRoutes = require('./routes/pdf.route');
const roleRoutes = require('./routes/role.route');
const roleuserRoutes = require('./routes/roleuser.route');
const userRoutes = require('./routes/user.route');

const app = express();
const PORT = process.env.PORT || 3000;

const mongodbUrl = process.env.MONGO_URI;
connectMongoDB(mongodbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static('public'));
app.use(cors({
    origin: "http://localhost:5173", // frontend vite URL
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/pdf', pdfmoduleRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/assign', roleuserRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send("This is a way to learn through games...")
})

app.listen(PORT, () => console.log(`app listening at PORT:${PORT}`));