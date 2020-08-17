const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const jwt_decode = require('jwt-decode')

const requireLogin = require('../middleware/requireLogin')

//modals
const User = require('../modals/userSchema')

//routes

//signup
// router.post('/signup', (req, res) => {
//   const { name, email, password } = req.body

//   if(!name || !email || !password){
//     return res.status(422).json({
//       error: 'Please add all the fields'
//     })
//   }

//   User.findOne({ email })
//     .then(savedUser => {
//       if(savedUser){
//         return res.status(422).json({
//           error: 'Email already exist'
//         })  
//       }

//       const newUser = new User({ name, email, password })
//           //hash password
//           bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//               if(err) throw err;
//               newUser.password = hash
//               //save to db
//               newUser.save()
//               .then(post => res.json({
//                   post,
//                   message: 'saved succesfully'
//               }))
//               .catch(err => console.log(err))
//             })
//           })
//     })      

//     .catch(err => console.log(err, ' outer err signupp'))

// })

//signup
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password){
    return res.status(422).json({
      error: 'Please add all the fields'
    })
  }

  User.findOne({ email })
    .then(savedUser => {
      if(savedUser){
        return res.status(422).json({
          error: 'Email already exist'
        })  
      }

      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const newUser = new User({ name, email, password: hashedPassword })
          
          newUser.save()
            .then(user => res.status(200).json({
              message: 'user saved succesfully'
            }))
            .catch(err => console.log(err, ' error'))
        })

    })      

    .catch(err => console.log(err, ' outer err signupp'))

})


// //old signin
// router.post('/signin', (req, res) => {
  
//   const { email, password } = req.body

//   if(!email || !password){
//     return res.status(422).json({
//         status: 'error',
//         type: "email or password",
//         message: "please add email or password."
//       })
//   }

//   //check email already exist or not
//   User.findOne({ email })
//   .then(user => {
//     if(!user){
//       return res.status(422).json({
//         status: 'error',
//         type: "email",
//         message: "Email is not registered."
//       })
//     }
//     //check password using bcrypt
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if(isMatch){
//         //generate token using jwt
//         const payload = { user }
//         jwt.sign(payload, keys.secretKey, {expiresIn: 3600}, (err, token) => {
//           //get user from token
//           const decode = jwt_decode(token)
//           res.json({
//             success: true,
//             token: 'Bearer ' + token,
//             decode: decode,
//             message: 'signin succesfully'
//           })
//         })

//       }else{
//         return res.status(400).json({
//           status: 'error',
//           type: "password",
//           message: "password is incorrect."
//         })
//       }
//     })
//     .catch(err => console.log(err, ' err'))
//   })

// })

router.get('/protected', requireLogin, (req, res) => {
  res.send("hello")
})

//new signin
router.post('/signin', (req, res) => {
  
  const { email, password } = req.body

  if(!email || !password){
    return res.status(422).json({
        status: 'error',
        type: "email or password",
        message: "please add email or password."
      })
  }

  //check email already exist or not
  User.findOne({ email })
  .then(user => {
    if(!user){
      return res.status(422).json({
        status: 'error',
        type: "email",
        message: "Email is not registered."
      })
    }
    //check password using bcrypt
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch){
        //generate token using jwt
          const token = jwt.sign({_id: user._id}, keys.secretKey)
          // user.password = undefined
          const { name, email, _id } = user
          const userData = { name, email, _id }
          res.status(200).json({ 
            message: 'Succesfully Login',
            user: userData,
            token
           })
       
        // const payload = { user }
        // jwt.sign(payload, keys.secretKey, {expiresIn: 3600}, (err, token) => {
        //   //get user from token
        //   const decode = jwt_decode(token)
        //   res.json({
        //     success: true,
        //     token: 'Bearer ' + token,
        //     decode: decode,
        //     message: 'signin succesfully'
        //   })
        // })

      }else{
        return res.status(400).json({
          status: 'error',
          type: "password",
          message: "password is incorrect."
        })
      }
    })
    .catch(err => console.log(err, ' err'))
  })

})


module.exports = router