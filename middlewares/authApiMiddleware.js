const authApiMiddleware = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
};

module.exports = authApiMiddleware;
