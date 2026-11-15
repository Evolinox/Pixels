const { verifyToken } = require('../utils/jwt');
const { sendErrorResponse } = require('../utils/errorPage');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendErrorResponse(req, res, 401,'Authorization header missing or invalid format');
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        return sendErrorResponse(req, res, err.status,'Invalid or expired token');
    }
};