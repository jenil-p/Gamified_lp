require('dotenv').config();
const express = require('express');
const path = require('path');
const connectMongoDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const cors = require('cors');
const multer = require('multer'); // Add multer for file uploads

// Routes import
const authRoutes = require('./routes/auth.route');
const pdfmoduleRoutes = require('./routes/pdf.route');
const roleRoutes = require('./routes/role.route');
const roleuserRoutes = require('./routes/roleuser.route');
const userRoutes = require('./routes/user.route');
const classRoutes = require('./routes/class.route');
const courseRoutes = require('./routes/course.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Store files in public/uploads
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true); // Accept only PDF files
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    },
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const mongodbUrl = process.env.MONGO_URI;
connectMongoDB(mongodbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static('public'));
app.use(
    cors({
        origin: 'http://localhost:5173', // Frontend Vite URL
        credentials: true,
    })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pdf', upload.single('pdf'), pdfmoduleRoutes); // Apply multer to pdf routes
app.use('/api/role', roleRoutes);
app.use('/api/assign', roleuserRoutes);
app.use('/api/user', userRoutes);
app.use('/api/class', classRoutes);
app.use('/api/course', courseRoutes);

app.get('/', (req, res) => {
    res.send('This is a way to learn through games...');
});

app.listen(PORT, () => console.log(`app listening at PORT:${PORT}`));