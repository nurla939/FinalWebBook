const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function isAuthenticated(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') return res.status(403).send('Forbidden');
    next();
}
module.exports = { isAuthenticated, isAdmin };
