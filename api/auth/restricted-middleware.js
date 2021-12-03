// const jwt = require("jsonwebtoken")
// const secrets = require('../../config/secrets')

// module.exports = (req,res,next) => {
    
//     const { authType , token } = req.headers.authorization.split(" ")
//     console.log('token',token )

//     if(token){ // Validate token
//         jwt.verify(token,secrets.jwtSecret ,(err,decodedToken )=>{
//             if(err) {
//                 next({ status: 401, message:"Bad token"})
//             } else {
//                 req.decodedJwt = decodedToken
//                 next()
//             }
//         }) 
        
//     } else {
//         res.status(401).json({message: "No valid token"})
//     }
// }

    // the value of teh header isn;t just teh token
    // we will use the split function --> return an array
    // the server retrives the token in the header called authorization 
    // Express can parrse the headers, put it in the req object 
    // the server doesn't have local storage
    // async function
    // Old node.js code: the last argement is a callback 
    // function to handle success and failure
    // The server looks at the signature which is built using the secret token.
    // If someone changes the hash the server will deny access 
    // by recreating the signture process. 
    // If the signature provided matches the one it recreates, 
    // the user is granted access