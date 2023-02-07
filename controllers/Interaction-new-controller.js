const express = require('express')
const router = express.Router()
const db = require('../models')
const { requireToken } = require('../middleware/auth')


router.use(express.json())
router.use(express.urlencoded({extended: true}))

// this is to get all comments
router.get('/', async (req,res, next) => {
    try {
        const allComment = await db.Interaction.find({})
        return res.status(200).json(allComment)
    } catch (err) {
        console.error(err)
        return next(err)
    }
})


// this is to post comments on the posts
router.post('/', requireToken, async (req,res) => {
    try {
        const owner = req.user._id
        req.body.owner = owner
        const createdComment = await db.Interaction.create(req.body)
        console.log(createdComment)
        res.status(201).json(createdComment)
    } catch (err) {
        console.error(err)
    }
})


module.exports = router