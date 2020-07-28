const express = require('express')
const router = express.Router()
const Serie = require("../model/serie")

async function getSerie(req, res, next) {
    try {
        serie = await Serie.findById(req.params.id)
        if (serie == null) {
            return res.status(404).json({message: 'Cant find serie'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.serie = serie
    next()
}

// Get all series
router.get('/', async (req, res) => {
    try {
        const series = await Serie.find()
        res.json(series)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting one serie
router.get('/:id', getSerie, async (req, res) => {
    res.json(res.serie)
})

// Create one serie
router.post('/', async (req, res) => {
    const serie = new Serie({
        name: req.body.name,
        year: req.body.year,
        episodes: req.body.episodes
    })
    try {

        let isSerie = await Serie.find({name: req.body.name});
        console.log(isSerie);
        if (isSerie.length >= 1) {
            return res.status(409).json({
                message: "Serie already added"
            });
        }

        const newSerie = await serie.save()
        res.status(201).json(newSerie)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Update one serie
router.patch('/:id', getSerie, async (req, res) => {
    if (req.body.name != null) {
        res.serie.name = req.body.name
    }

    if (req.body.year != null) {
        res.serie.year = req.body.year
    }

    if (req.body.episodes != null) {
        res.serie.episodes = req.body.episodes
    }
    try {
        const updatedSerie = await res.serie.save()
        res.json(updatedSerie)
    } catch {
        res.status(400).json({message: err.message})
    }
})

// Delete one serie
router.delete('/:id', getSerie, async (req, res) => {
    try {
        await res.serie.remove()
        res.json({message: 'Deleted This serie'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router