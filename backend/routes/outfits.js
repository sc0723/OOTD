const express = require('express')
const {
    deleteOutfit,
    updateOutfit,
    createOutfit,
    getOutfits,
    getOutfit
} = require('../controllers/outfitController')
const router = express.Router()

// GET all outfits
router.get('/', getOutfits)

// GET a single outfit
router.get('/:id', getOutfit)

// POST a new outfit
router.post('/', createOutfit)

// DELETE an outfit
router.delete('/:id', deleteOutfit)

// UPDATE an outfit
router.patch('/:id', updateOutfit)


module.exports = router