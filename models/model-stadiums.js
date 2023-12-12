const mongoose = require('mongoose')

const {Schema} = mongoose

const SchemaStadium = new Schema({
  id : {
    type : Number,
    required : true,
    unique : true
  },
  name :{
    type : String,
    required : true
  },
  capacity : {
    type : Number,
    required : true
  },

  city : {
    type : Schema.Types.ObjectId,
    ref : 'city'
  }
})

module.exports = mongoose.model('stadium', SchemaStadium)