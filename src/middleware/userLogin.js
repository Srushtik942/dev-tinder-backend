const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                error: "Token missing"
            });
        }

        const decodedObj = jwt.verify(token, "SECRET_KEY");

        req.user = decodedObj;

        next();

    } catch (error) {
        res.status(401).json({
            error: "Invalid token"
        });
    }
};

module.exports = authUser;