const express = require('express')
const artistC = require("../controllers/artist.controller")
const router = express.Router()
const {VerifyJWT} = require("../../middlewares/VerifyJWT")
const {VerifyRoles} = require("../../middlewares/VerifyRoles")
const {VerifyRefToken} = require("../../middlewares/VerifyRefToken")
const roles = require("../../config/roles")

// Get Routes
router.get('/getAllArtists', [VerifyRefToken, VerifyJWT], artistC.getAllArtists)

router.get("/getAllRequiredArtists", [VerifyRefToken, VerifyJWT, VerifyRoles(roles[0].id, roles[1].id)], artistC.getAllRequiredArtists)

router.post('/getArtist', [VerifyRefToken, VerifyJWT], artistC.getArtist)

// Post Routes
router.post("/addArtist", [VerifyRefToken, VerifyJWT, VerifyRoles(roles[0].id, roles[1].id)], artistC.addArtist)

router.post("/requestArtist", [VerifyRefToken, VerifyJWT], artistC.requestArtist)

// Put Routes
router.put("/alterArtist", [VerifyRefToken, VerifyJWT, VerifyRoles(roles[0].id, roles[1].id)], artistC.alterArtist)

// Delete Routes
router.post("/delArtist", [VerifyRefToken, VerifyJWT, VerifyRoles(roles[0].id)], artistC.delArtist)

module.exports = router