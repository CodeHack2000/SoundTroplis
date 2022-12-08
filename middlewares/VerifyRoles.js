const logger = require("../auth/logger")

const VerifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.userRole) {
            logger.error(new Error(`Request without role! - UserID: ${req.userId} - Route: ${req.path}`))
            return res.json({error: "Role Error"})
        }
        let rolesArray = [...allowedRoles]
        const authRole = rolesArray.includes(req.userRole)

        if (authRole) next()
        else {
            logger.error(new Error(`User doesn't have permissions to this route - UserID: ${req.userId} - Route: ${req.path}`))
            res.json({message: "Doesn't have permissions to this route!"})
        }
    }
}

module.exports = {VerifyRoles}