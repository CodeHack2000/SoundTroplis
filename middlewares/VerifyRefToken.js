const jwt = require("../auth/node_modules/jsonwebtoken")
const logger = require("../auth/logger")
require("../auth/node_modules/dotenv").config({path: '../auth/.env'})

const VerifyRefToken = (req, res, next) => {
    const token = req.cookies.token
    const refToken = req.cookies.refToken

    if (token) return next()
    else {
        if (!refToken) {
            logger.error(new Error(`Request without refresh_token! - ${req.path}`))
            return res.json({state: false, message: "Invalid Refresh Token!"})
        } else {
            jwt.verify(refToken, process.env.REF_KEY, (err, decoded) => {
                if (err) {
                    logger.error(new Error(`${err} - Route: ${req.path}`))
                    res.clearCookie("refToken")
                    return res.json({state: false, message: "Failed in generation of an new Token!"})
                } else {
                    const userId = decoded.id
                    const userRole = decoded.role
    
                    const token = jwt.sign({id: userId, role: userRole}, process.env.KEY, {
                        expiresIn: '5m',
                    })
    
                    res.cookie("token", token, {
                        httpOnly: true,
                        maxAge: 300000,
                        sameSite: 'lax',
                    })
    
                    return next()
                }
            })
        }
    }
}

module.exports = {VerifyRefToken}