const adminMiddleware = (req, res, next) => {
    try {
        const userRole = req.user.role;

        // Check if user is an admin
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = adminMiddleware;
