const jwt = require('jsonwebtoken');

const secret = "#45vgfjYU%^&%Gm@jhvJHBJHnbh8765tfHGj8NCFjyt6r5$YGFBcgvn87Gjytd3g";

function createTokenForUser(user) {
    const payload = {
        _id : user._id,
        instituteMail : user.instituteMail,
        role : user.role,
    };
    const token = jwt.sign(payload , secret);
    return token;
}

function validateToken(token) {
    const payload = jwt.verify(token,secret);
    return payload;
}

module.exports = {createTokenForUser , validateToken}