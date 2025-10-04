import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors'
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import userRoute from './routes/Userroute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// DB Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

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
