import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const authenticateToken = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            success: 'false',
            message: 'Token is required for authentication',
        });
    }

    try {
        const decoded = jwt.verify(token, config.SECRET_TOKEN);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            success: 'false',
            message: 'Invalid Token',
            error: err.message,
        });
    }
    return next();
};

export default authenticateToken;
