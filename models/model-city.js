const mongoose = require('mongoose')

/**
 * Definición del esquema de datos para el modelo City.
 * @module models/model-city
 */

const {Schema} = mongoose

/**
 * Esquema de datos para el modelo City.
 * @typedef {Object} City
 * @property {number} id - Identificador único de la ciudad.
 * @property {string} name - Nombre de la ciudad.
 * @property {string} country - País al que pertenece la ciudad.
 * @property {ObjectId[]} stadiums - Lista de identificadores de estadios asociados a la ciudad.
 */
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

/**
 * Modelo de datos para la colección 'cities' en MongoDB.
 * @name CityModel
 * @type {mongoose.Model<City>}
 */
module.exports = mongoose.model('city', SchemaCity)