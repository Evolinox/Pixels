/* old version:
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
*/
const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the "Authorization" header

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token); // Decode the token
        req.user = decoded; // Attach userId to the request object for later use
        next(); // Continue to the next route handler
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};