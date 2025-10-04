import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SignModel from '../models/SignupModel.js';

// Register User
const registeruser = async (req, res) => {
  try {
    const { name, instituteMail, password } = req.body;

    // Validation
    if (!name || !instituteMail || !password)
      return res.status(400).json({ success: false, message: 'Missing Details' });

    if (!validator.isEmail(instituteMail))
      return res.status(400).json({ success: false, message: 'Invalid email' });

    if (password.length < 8)
      return res.status(400).json({ success: false, message: 'Password too short' });

    const exist = await SignModel.findOne({ instituteMail });
    if (exist)
      return res.status(400).json({ success: false, message: 'Email already registered' });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    const newUser = new SignModel({ name, instituteMail, password: hashedPassword });
    const savedUser = await newUser.save();

    // JWT Token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        instituteMail: savedUser.instituteMail,
      },
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

// Login User
const loginuser = async (req, res) => {
  try {
    const { instituteMail, password } = req.body;
    if (!instituteMail || !password)
      return res.status(400).json({ success: false, message: 'Missing credentials' });

    const user = await SignModel.findOne({ instituteMail });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

export { registeruser, loginuser };
