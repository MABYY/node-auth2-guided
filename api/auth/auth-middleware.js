const jwt = require("jsonwebtoken")
const secrets = require('../../config/secrets')

// AUTHENTICATION
const restricted = (req, res, next) => {
  console.log(req.headers)
  const { authType , token } = req.headers.authorization.split(" ")
  console.log('token',token )

  if(token){ // Validate token
      jwt.verify(token,secrets.jwtSecret ,(err,decodedToken )=>{
          if(err) {
              next({ status: 401, message:"Bad token"})
          } else {
              req.decodedJwt = decodedToken
              next()
          }
      }) 
      
  } else {
      res.status(401).json({message: "No valid token"})
  }
}

// AUTHORIZATION
const checkRole = (req, res, next) => {
  next()
}

module.exports = {
  restricted,
  checkRole,
}
