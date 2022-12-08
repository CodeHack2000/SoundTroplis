const express = require("express")
const cors = require("cors")
const {default: mongoose} = require("mongoose")
const logger = require("./logger")
require("dotenv").config()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

// Database URL
const dbURL = process.env.DB_URL

// API init
const app = express()

// Connect to Database
mongoose.connect(dbURL)
    .then(() => {
        logger.info("DB-Artist Connected!")
    })
    .catch((error) => {
        logger.error(new Error(error))
    })

// API Configuration
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000', credentials: true, methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],}))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// Routes
const artistRoute = require("./routes/artist.routes")
app.use("/artists", artistRoute)

// API Listeting for Requests
app.listen(5100, logger.info("Server-Artist Running!"))