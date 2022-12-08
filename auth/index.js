const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const logger = require("./logger")
require("dotenv").config()

// Database URL
const dbUrl = process.env.DB_URL

// API init
const app = express()

// Connect to Database
mongoose.connect(dbUrl)
    .then(() => {
        logger.info("DB Connected!")
    })
    .catch((error) => {
        logger.error(new Error(error))
    })

// API Configuration
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000', credentials: true,}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

// Routes
const authRouter = require('./routes/auth.routes')
app.use("/auth", authRouter)

// API Listeting for Requests
app.listen(5000, logger.info("Server Running!"))