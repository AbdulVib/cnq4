const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const mongoose = require('mongoose')

const User = require('../modals/userSchema')

module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization){
       return res.status(401).json({
            error: 'you must be logged in'
        })
    }

    const token = authorization.replace("Bearer ", "")
    
    jwt.verify(token, keys.secretKey, (err, payload) => {
        if(err){
           return res.status(401).json({
                error: 'you must be logged in'
            })  
        }

        const { _id } = payload
        
        User.findById(_id)
            .then(userData => {
                req.user = userData
                next()
            })
    })
}