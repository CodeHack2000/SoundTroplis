const ArtistModel = require("../models/Artist")
const logger = require("../logger")

exports.getAllRequiredArtists = async (req, res) => {
    const artists = await ArtistModel.find({status: false})

    if (artists) {
        return res.json({response: artists, message: "Success!"})
    } else return res.json({response: [], message: "Success!"})
}

exports.getAllArtists = async (req, res) => {
    const artists = await ArtistModel.find({status: true})

    if (artists) {
        return res.json({response: artists, message: "Success!"})
    } else return res.json({response: [], message: "Success!"})
}

exports.getArtist = async (req, res) => {
    const {variation} = req.body

    if (variation) {
        if (variation.length >= 3) {
            const artist = await ArtistModel.findOne({variation: variation})
        
            if (artist) {
                return res.json({response: artist, message: "Success!"})
            } else {
                logger.error(new Error(`Artist not found! - ArtistId: ${variation}`))
                return res.json({response: {}, messagage: "Artist not found!"})
            }
        } else return res.json({response: {}, message: "Invalid ID!"})
    } else return res.json({response: {}, message: "Variation can't be null"})
}

exports.requestArtist = async (req, res) => {
    const {variation, name, age} = req.body

    let artist = await ArtistModel.findOne({variation: variation})

    if (!artist) {
        artist = new ArtistModel({
            variation: variation,
            name: name,
            age: age,
            status: false,
        })

        await artist.save()

        logger.info(`Artist added successfully to request list! - ArtistId: ${artist._id}`)
        return res.json({message: "Success!"})
    } else return res.json({message: "Artist already exists!"})
}

exports.addArtist = async (req, res) => {
    const {variation, name, age} = req.body

    let artist = await ArtistModel.findOne({variation: variation})

    if (!artist) {
        artist = new ArtistModel({
            variation: variation,
            name: name,
            age: age,
        })

        await artist.save()

        logger.info(`Artist added successfully! - ArtistId: ${artist._id}`)
        return res.json({message: "Success!"})
    } else return res.json({message: "Artist already exists!"})
}

exports.alterArtist = async (req, res) => {
    const {variation, name, age, status} = req.body

    if (variation) {
        if (variation.length >= 3) {
            const artist = await ArtistModel.findOne({variation: variation})
    
            if (artist) {
                const query = {$set: {name: name, age: age, status: status}}
                await ArtistModel.updateOne({variation: variation}, query)
                    .then(() => {
                        logger.info(`Artist Altered! - ArtistId: ${artist._id}`)
                        return res.json({message: "Success!"})
                    })
                    .catch((err) => {
                        logger.error(new Error(`${err} - ArtistId: ${artist._id}`))
                        return res.json({message: err})
                    })
            } else res.json({message: "Artist not found!"})
        } else return res.json({response: {}, message: "Invalid ID!"})
    } else return res.json({response: {}, message: "Variation can't be null"})
}

exports.delArtist = async (req, res) => {
    const {variation} = req.body

    if (variation) {
        if (variation.length >= 3) {
            const artist = await ArtistModel.findOne({variation: variation})
    
            if (artist) {
                await ArtistModel.deleteOne({variation: variation})
                    .then(() => {
                        logger.info(`Artist Deleted! - Variation: ${artist._id}`)
                        return res.json({message: "Success!"})
                    })
                    .catch((err) => {
                        logger.error(new Error(`${err} - ArtistId: ${artist._id}`))
                        return res.json({message: err})
                    })
            } else return res.json({message: "Artist not found!"})
        } else return res.json({response: {}, message: "Invalid Variation!"})
    } else return res.json({response: {}, message: "Variation can't be null"})
}