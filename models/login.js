const mongoose = require('mongoose')
const Schema = mongoose.Schema
const login = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const admin = mongoose.model('admin',login)
const student = mongoose.model('student',login)
module.exports = student