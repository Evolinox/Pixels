const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};