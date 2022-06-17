let mongoose = require('mongoose');

// create a model class
let userModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String,
    birth: String,
    password: String
},
{
    collection: "userStored"
});

module.exports = mongoose.model('Book', userModel);