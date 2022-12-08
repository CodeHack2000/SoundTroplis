const express = require('express')
const router = express.Router()
const reviewC = require("../controllers/review.controller")
const {VerifyJWT} = require("../../middlewares/VerifyJWT")
const {VerifyRoles} = require("../../middlewares/VerifyRoles")
const {VerifyRefToken} = require("../../middlewares/VerifyRefToken")
const roles = require("../../config/roles")

// Get Routes
router.post('/getAllActiveReviewsOfArtist', [VerifyRefToken, VerifyJWT], reviewC.getAllActiveReviewsOfArtist)

router.post('/getAllReviewsOfArtist', [VerifyRefToken, VerifyJWT, VerifyRoles(roles[0].id, roles[1].id)], reviewC.getAllReviewsOfArtist)

router.post('/getReview', [VerifyRefToken, VerifyJWT], reviewC.getReview)

// Post Routes
router.post('/addReview', [VerifyRefToken, VerifyJWT], reviewC.addReview)

// Put Routes
router.put('/alterReview', [VerifyRefToken, VerifyJWT], reviewC.alterReview)

// Delete Routes
router.post('/delReview', [VerifyRefToken, VerifyJWT, VerifyRoles(roles[0].id)], reviewC.delReview)

module.exports = router