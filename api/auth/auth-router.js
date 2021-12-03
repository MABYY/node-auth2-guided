const bcrypt = require('bcryptjs')

const router = require('express').Router()
const User = require('../users/users-model.js')

const jwt = require("jsonwebtoken")
const secrets = require('../../config/secrets')

const { BCRYPT_ROUNDS } = require('../../config')

router.post('/register', (req, res, next) => {
  let user = req.body

  // bcrypting the password before saving
  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)
  // never save the plain text password in the db
  user.password = hash

  User.add(user)
    .then(saved => {
      res.status(201).json({ message: `Great to have you, ${saved.username}` })
    })
    .catch(next) // our custom err handling middleware in server.js will trap this
})

router.post('/login', (req, res, next) => {
  let { username, password } = req.body

  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate a token and include it in the response

        const token = generateToken(user)

        res.status(200).json({ message: `Welcome back ${user.username}...` , token})
      } else {
        next({ status: 401, message: 'Invalid Credentials' })
      }
    })
    .catch(next)
})

function generateToken (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }

  const options = {
     expiresIn: '1d'
  }
  const secret = secrets.jwtSecret

  return jwt.sign(payload,secret,options)

}

module.exports = router
