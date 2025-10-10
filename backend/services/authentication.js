const jwt = require('jsonwebtoken');

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        instituteMail: user.instituteMail,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    console.log('Generated token:', token); // Debug
    return token;
}

function validateToken(token) {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Validated token payload:', payload); // Debug
    return payload;
}

module.exports = { createTokenForUser, validateToken };