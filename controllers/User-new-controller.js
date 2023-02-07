const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { createUserToken, requireToken } = require('../middleware/auth')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// to get all user infos
router.get('/', async (req, res, next) => {
    try {
        const allUser = await db.User.find()
        return res.status(200).json(allUser)
    } catch (err) {
        console.error(err)
        return next(err)
    }
})

// to get an individual user info
router.get('/:id', async (req, res, next) => {
    try {
        const foundUser = await db.User.findById(req.params.id)
        console.log(foundUser)
        return res.status(200).json(foundUser)
    } catch (err) {
        console.error(err)
        return next(err)
    }
})

// //api call for individual user posts
router.get('/posts/:id', async (req, res, next) => {
    try {
        const foundUser = await db.User.findById(req.params.id)
        const foundposts = await db.Post.find({ owner: req.params.id})
        return res.status(200).json(foundposts)
    } catch (err) {
        console.error(err)
        return next(err)
    }
})
  
// will use these later to update user info and delete user
router.put('/:id', async (req, res) => {
    try {
        

        const updatedPerson = await db.User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedPerson)
    } catch (err) {
        res.status(400).json({ error: err })
    }

})

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await db.User.findByIdAndDelete(req.params.id)
        console.log(deletedUser)
        res.redirect('/')
    } catch (err) {
        console.error(err)
        return next(err)
    }

})

module.exports = router