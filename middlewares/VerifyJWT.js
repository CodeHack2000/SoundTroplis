const jwt = require("../auth/node_modules/jsonwebtoken")
const logger = require("../auth/logger")
require("../auth/node_modules/dotenv").config({path: '../auth/.env'})

const VerifyJWT = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        logger.error(new Error(`Request without access_token! - Route: ${req.path}`))
        return res.json({auth: false, message: "Invalid Token!"})
    } else {
        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if (err) {
                logger.error(new Error(`Invalid access_token! - Route: ${req.path}`))
                res.clearCookie("token")
                return res.json({auth: false, message: "Failed Authenticate!"})
            } else {
                req.userId = decoded.id
                req.userRole = decoded.role
                return next()
            }
        })
    }
}

module.exports = {VerifyJWT}