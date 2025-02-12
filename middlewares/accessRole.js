const checkAccessRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(401).json({ msg: 'Permission denied' });
        }
        next();
    };
};

module.exports = checkAccessRoles;