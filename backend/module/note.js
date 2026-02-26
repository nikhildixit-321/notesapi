const uuid = require('uuid')
const mongoose = require('mongoose')
const { stringify } = require('uuid')


const noteSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        require:true,
        unique:true
    },
  

},{
    Timestamp:true
})
const Note = mongoose.model('Note',noteSchema)
module.exports= Note