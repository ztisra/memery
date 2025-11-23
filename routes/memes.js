const express = require('express')
const router = express.Router()
const Meme = require('../models/meme')
const Author = require('../models/author')

router.get('/', async (req, res) => {
    res.send('All Memes')
})

// new meme
router.get('/new', async (req, res) => {
    try {
        const authors = await Author.find({})
        const meme = new Meme()
        res.render('memes/new', {
            authors: authors,
            meme: meme
        })
    } catch {
        res.redirect('memes')
    }
})

// create meme
router.post('/', async (req, res) => {
    res.send('Create Meme')
})




module.exports = router