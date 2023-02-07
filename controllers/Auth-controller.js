const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { createUserToken } = require('../middleware/auth')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// to sign up for the site
router.post('/register', async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const passHash = await bcrypt.hash(req.body.password, salt)

        const rawPWStore = req.body.password
        req.body.password = passHash

        const newUser = await db.User.create(req.body)

        if(newUser){
            req.body.password=rawPWStore
            const authenticToken = createUserToken(req, newUser)
            console.log(authenticToken)
            res.status(201).json({
                user: newUser,
                isLpggedIn: true,
                token: authenticToken
            })
        }
       
 
    } catch (err) {
        console.error(err)
        return next(err)
    }
})

// to log in to the site
router.post("/login", async (req, res, next) => {
    try {
      const loggingUser = req.body.username;
      const foundUser = await db.User.findOne({ username: loggingUser });
      if (!foundUser) {
        return res.json({error: 'User not found!'})
      }
      const token = await createUserToken(req, foundUser);
      console.log(token)
      res.status(200).json({
        user: foundUser,
        isLoggedIn: true,
        token,
      });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });

  module.exports = router