const mongoose = require('mongoose')

const {Schema} = mongoose

const SchemaCity = new Schema({
  id : {
    type : Number,
    required : true,
    unique : true
  },
  name : {
    type : String,
    required : true,
  },
  country :{
    type : String,
    required : true
  },

  stadiums : [
    {
      type : Schema.Types.ObjectId,
      ref : 'stadium'
    }
  ]
})

//city (singular) especifica el nombre de la colección, que en la BD será en plural
module.exports = mongoose.model('city', SchemaCity)