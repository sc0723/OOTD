const Outfit = require('../models/outfitModel')
const mongoose = require('mongoose')
// get all outfits
const getOutfits = async (req, res) => {
    const outfits = await Outfit.find({}).sort({createdAt: -1})

    res.status(200).json(outfits)
}

// get a single outfit
const getOutfit = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such outfit'})
    }
    const outfit = await Outfit.findById(id)

    if (!outfit) {
        return res.status(404).json({error: 'No such outfit'})
    }

    res.status(200).json(outfit)

}

// create new outfit
const createOutfit = async (req, res) => {
    const {title, type, top, bottom, shoes} = req.body
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!type) {
        emptyFields.push('type')
    }
    if (!top) {
        emptyFields.push('top')
    }
    if (!bottom) {
        emptyFields.push('bottom')
    }
    if (!shoes) {
        emptyFields.push('shoes')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    // Add doc to db
    try {
        const outfit = await Outfit.create({title, type, top, bottom, shoes})
        res.status(200).json(outfit)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete an outfit
const deleteOutfit = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such outfit'})
    }
    const outfit = await Outfit.findOneAndDelete({_id: id})

    if (!outfit) {
        return res.status(400).json({error: 'No such outfit'})
    }

    res.status(200).json(outfit)
}

//update an outfit
const updateOutfit = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such outfit'})
    }

    const outfit = await Outfit.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!outfit) {
        return res.status(400).json({error: 'No such outfit'})
    }

    res.status(200).json(outfit)
}

module.exports = {
    getOutfits,
    getOutfit,
    createOutfit,
    deleteOutfit,
    updateOutfit
}