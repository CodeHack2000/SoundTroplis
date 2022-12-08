const UserModel = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const roles = require("../../config/roles")
const logger = require("../logger")

exports.newToken = (req, res) => {
    return res.json({state: true, message: "Success!"})
}

exports.givePermissions = async (req, res) => {
    const {email} = req.body

    const user = await UserModel.findOne({email: email})

    if (user) {
        let newValue = null

        if (user.role === 2462) newValue = 6236
        else newValue = 2462
        const query = {$set: {role: newValue}}

        await UserModel.updateOne({email}, query)
            .then(() => {
                if (newValue === 6236) logger.info(`Added new Moderator! - ADMIN ACTION - UserId: ${user._id}`)
                else logger.info(`Removed one Moderator! - ADMIN ACTION - UserId: ${user._id}`)
                return res.json({state: true, message: "Success!"})
            })
            .catch((err) => {
                logger.error(new Error(`${err} - ADMIN ACTION -  UserID: ${user._id} - Route: ${req.path}`))
            })
    } else {
        return res.json({message: "User not found!"})
    }
}

exports.highPermissions = (req, res) => {
    return res.json({message: "You have high permissions!"})
}

exports.userData = (req, res) => {
    let role = roles.filter((obj) => {
        return obj.id === req.userRole
    })
    role = role[0].role
    
    return res.json({user: {id: req.userId, role: role}})
}

exports.isAuth = (req, res) => {
    return res.json({auth: true, message: "Success!"})
}

exports.login = async (req, res) => {
    const {email, password} = req.body

    // Get user
    const user = await UserModel.findOne({email})

    if (user) {
        // Validate password
        const match = await bcrypt.compare(password, user.password)

        // Expires in 20min
        if (match) {
            const id = user._id
            const token = jwt.sign({id: id, role: user.role}, process.env.KEY, {
                expiresIn: '5m',
            })

            const refToken = jwt.sign({id: id, role: user.role},
            process.env.REF_KEY, {
                expiresIn: '1h',
            })

            logger.info(`User logged in successfully! - UserId: ${id}`)
            return res
                .cookie("refToken", refToken, {
                    httpOnly: true,
                    maxAge: 3600000,
                    sameSite: 'lax',
                })
                .cookie("token", token, {
                    httpOnly: true,
                    maxAge: 300000,
                    sameSite: 'lax',
                })
                .json({auth: true, token: token, refToken: refToken, user: {id: user._id, username: user.username, email: user.email}})
        } else {
            return res.json({error: "Password doesn't match!"})
        }
    } else return res.json({error: "User doesn't exists!"})
}

exports.register = async (req, res) => {
    const {username, email, password} = req.body

    // Check if user exists
    let user = await UserModel.findOne({email})

    if (!user) {
        const hash = await bcrypt.hash(password, 12)

        user = new UserModel({
            username: username,
            email: email,
            password: hash,
            role: 2462,
        })

        // Save in database
        await user.save()

        logger.info(`User registered successfully! - UserId: ${user._id}`)
        return res.json("Success!")
    } else return res.json({error: "User already exists!"})
}

exports.logout = (req, res) => {
    return res
        .clearCookie("token")
        .clearCookie("refToken")
        .json("Success!")
}