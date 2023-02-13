const jwt = require('jsonwebtoken');
const JWT_SECRET = "mynameissahilkhatri";

const fetchuser = (req, res, next) => {

    const token = req.header('jwt-token');
    if (!token) {
        res.status(401).json({
            success: false,
            message: "please authenticate using password and email"
        })
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
}
module.exports = fetchuser;