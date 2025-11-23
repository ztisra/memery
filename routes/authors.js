const express = require('express')
const router = express.Router()
const Author = require('../models/author')

router.get('/', async (req, res) => {
    let searchOptions = {}
    const nameQuery = req.query.name
    if (nameQuery != null && nameQuery !== '') {
        searchOptions.name = new RegExp(nameQuery, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { authors: authors, searchOptions: { name: nameQuery } })

    } catch (err) {
        console.error(err)
        res.render('authors/index', { authors: [], errorMessage: 'Error fetching authors', searchOptions: { name: nameQuery } })
    }
})

// new author
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// create author
// "Model.prototype.save() no longer accepts a callback", so use async/await
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect('/authors')
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
    }
})




module.exports = router