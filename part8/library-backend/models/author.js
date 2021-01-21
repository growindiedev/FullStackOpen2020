const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 2,
    required: true
  },
  born: {
    type: Number
  }
})

module.exports = mongoose.model('Author', schema)