const jwt = require('jsonwebtoken');
const isAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];    
    if(!token){
        return res.status("401").json({msg:'invalid token!'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({msg:'invalid token'});
    }
};

module.exports = isAuth;