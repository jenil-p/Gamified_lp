const jwt = require('jsonwebtoken');

const checkForAuthenticationCookie = (cookieName) => {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    console.log('Cookie token:', token);
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Cookie decoded:', decoded);
        req.user = decoded;
      } catch (err) {
        console.error('Cookie token verification error:', err.message);
      }
    }
    next();
  };
};

const verifyToken = (req, res, next) => {
  console.log('Headers:', req.headers);
  let token = req.headers.authorization?.split(' ')[1];

  if (!token && req.cookies.token) {
    token = req.cookies.token;
    console.log('Using cookie token:', token);
  }

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.userId = decoded._id; // Match _id from token payload
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(403).json({ message: `Invalid or expired token: ${err.message}` });
  }
};

module.exports = { checkForAuthenticationCookie, verifyToken };