const express = require('express')
const router = express.Router()
const authC = require("../controllers/auth.controller")
const {VerifyJWT} = require("../middlewares/VerifyJWT")
const {VerifyRoles} = require("../middlewares/VerifyRoles")
const {VerifyRefToken} = require("../middlewares/VerifyRefToken")
const roles = require("../config/roles")
const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    max: 5, // 5 Times max
    standartHeaders: true,
    legacyHeaders: false,
    message: "Many failed login tries, please wait 10min",
})

router.get('/newToken', VerifyRefToken, authC.newToken)

router.get('/highPermissions', [VerifyRefToken, VerifyJWT, VerifyRoles(roles[0].id, roles[1].id)], authC.highPermissions)

router.get('/userData', [VerifyRefToken, VerifyJWT], authC.userData)

router.get('/isAuth', [VerifyRefToken, VerifyJWT], authC.isAuth)

router.post("/givePermissions", [VerifyRefToken, VerifyJWT, VerifyRoles(roles[0].id)], authC.givePermissions)

router.post("/login", loginLimiter, authC.login)

router.post("/register", authC.register)

router.post("/logout", authC.logout)

module.exports = router