const express = require("express")
const cors = require("cors")
const {default: mongoose} = require("mongoose")
const logger = require("./logger")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

// Database URL
const dbURL = process.env.DB_URL

// API init
const app = express()

// Connect to Database
mongoose.connect(dbURL)
    .then(() => {
        logger.info("DB-Review Connected!")
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
const reviewRoute = require("./routes/review.routes")
app.use("/reviews", reviewRoute)

// API Listeting for Requests
app.listen(5200, logger.info("Server-Review Running!"))