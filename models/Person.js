const mongoose = require('mongoose')

const Person = mongoose.model('Person' ,{
name: String,
nickname: String,
approved:  Boolean,
})

module.exports = Person 