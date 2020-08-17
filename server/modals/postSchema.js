const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const schema =  mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [
    { 
      text: String,
      postedBy: { type: ObjectId, ref: 'User' }
    }
  ],
  pic: {
    type: String,
    // default: 'no photo'
    required: true
  },
  postedBy: {
    type: ObjectId,
    ref: 'User'
  }
})

const User = mongoose.model('Post', schema)

module.exports = User