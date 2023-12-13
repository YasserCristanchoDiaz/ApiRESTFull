const mongoose = require('mongoose')

/**
 * Definición del esquema de datos para el modelo Stadium.
 * @module models/model-stadiums
 */

const {Schema} = mongoose

/**
 * Esquema de datos para el modelo Stadium.
 * @typedef {Object} Stadium
 * @property {number} id - Identificador único del estadio.
 * @property {string} name - Nombre del estadio.
 * @property {number} capacity - Capacidad del estadio.
 * @property {string} team - Equipo asociado al estadio.
 * @property {ObjectId} city - Identificador de la ciudad a la que pertenece el estadio.
 */
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
  team :{
    type : String,
    required : true
  },

  city : {
    type : Schema.Types.ObjectId,
    ref : 'city'
  }
})

/**
 * Modelo de datos para la colección 'stadiums' en MongoDB.
 * @name StadiumModel
 * @type {mongoose.Model<Stadium>}
 */
module.exports = mongoose.model('stadium', SchemaStadium)