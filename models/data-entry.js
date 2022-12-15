const mongoose = require('mongoose')
const Schema = mongoose.Schema
const object= new Schema({
    subject:String,
    yr:Number,
    section:String,
    sem:Number
})
const data = new Schema({
    lecturer:String ,
    subjects:[object]
})
module.exports = mongoose.model('itlecturer',data)
