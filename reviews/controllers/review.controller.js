const ReviewModel = require("../models/Review")
const logger = require("../logger")

exports.getAllActiveReviewsOfArtist = async (req, res) => {
    const {artist} = req.body

    if (artist) {
        if (artist.length >= 3) {
            const reviews = await ReviewModel.find({artist: artist, status: true})
            
            if (reviews) return res.json({response: reviews, message: "Success!"})
            else return res.json({response: [], message: `Artist ${artist} don't have any review!`})
        } else {
            logger.error(new Error(`Invalid Artist! - Artist: ${artist}`))
            return res.json({response: {}, message: "Invalid Artist!"})
        }
    } else return res.json({response: {}, message: "Artist can't be undefined"})
}

exports.getAllReviewsOfArtist = async (req, res) => {
    const {artist} = req.body

    if (artist) {
        if (artist.length >= 3) {
            const reviews = await ReviewModel.find({artist: artist})
            
            if (reviews) return res.json({response: reviews, message: "Success!"})
            else return res.json({response: [], message: `Artist ${artist} don't have any review!`})
        } else {
            logger.error(new Error(`Invalid Artist! - Artist: ${artist}`))
            return res.json({response: {}, message: "Invalid Artist!"})
        }
    } else return res.json({response: {}, message: "Artist can't be undefined"})
}

exports.getReview = async (req, res) => {
    const {id} = req.body

    if (id) {
        if (id.length == 24) {
            const review = await ReviewModel.findOne({_id: id})
    
            if (review) return res.json({response: review, message: "Success!"})
            else return res.json({response: {}, message: `Review with ${id} ID don't exists!`})
        } else {
            logger.error(new Error(`Invalid Review ID! - ReviewID: ${id}`))
            return res.json({response: {}, message: "Invalid ID!"})
        }
    } else return res.json({response: {}, message: "ID can't be undefined"})
}

exports.addReview = async (req, res) => {
    const {artist, rank, comment} = req.body
    const userId = req.userId

    if (artist && userId) {
        if (artist.length >= 3 && userId.length == 24) {
            let review = await ReviewModel.findOne({artist: artist, userId: userId})
    
            if (!review) {
                review = new ReviewModel({
                    artist: artist,
                    userId: userId,
                    rank: rank,
                    comment: comment,
                })
    
                await review.save()
    
                logger.info(`Review added successfully! - ReviewId: ${review._id}`)
                return res.json({message: "Success!"})
            } else return res.json({message: "Review already exists!"})
        } else {
            logger.error(new Error(`Invalid ID's! - Artist: ${artist} - UserID: ${userID}`))
            return res.json({response: {}, message: "Invalid ID's!"})
        }
    } else return res.json({response: {}, message: "ID's can't be undefined"})
}

exports.alterReview = async (req, res) => {
    const {id, rank, comment, status} = req.body
    const userId = req.userId
    const userRole = req.userRole

    if (id) {
        if (id.length == 24) {
            const review = await ReviewModel.findOne({_id: id})
    
            if (review) {
                if (review.userId === userId || userRole === 8274 || userRole === 6236) {
                    const query = {$set: {rank: rank, comment: comment, status: status}}
                await ReviewModel.updateOne({_id: id}, query)
                    .then(() => {
                        logger.info(`Review Altered! - ReviewId: ${review._id}`)
                        return res.json({message: "Success!"})
                    })
                    .catch(() => {
                        logger.error(new Error(`${err} - ReviewId: ${id}`))
                        return res.json({message: err})
                    })
                } else res.json({message: "You cannot edit other users' reviews!"})
            } else res.json({message: "Review not found!"})
        } else {
            logger.error(new Error(`Invalid Review ID! - ReviewID: ${id}`))
            return res.json({response: {}, message: "Invalid ID!"})
        }
    } else return res.json({response: {}, message: "ID can't be undefined"})
}

exports.delReview = async (req, res) => {
    const {id} = req.body

    if (id) {
        if (id.length == 24) {
            const review = await ReviewModel.findOne({_id: id})
    
            if (review) {
                await ReviewModel.deleteOne({_id: id})
                    .then(() => {
                        logger.info(`Review Deleted! - ReviewId: ${id}`)
                        return res.json({message: "Success!"})
                    })
                    .catch((err) => {
                        logger.error(new Error(`${err} - ReviewId: ${id}`))
                        return res.json({message: err})
                    })
            } else return res.json({message: "Review not found!"})
        } else {
            logger.error(new Error(`Invalid Review ID! - ReviewID: ${id}`))
            return res.json({response: {}, message: "Invalid ID!"})
        }
    } else return res.json({response: {}, message: "ID can't be undefined"})
}