const routes = require('express').Router()

/**
 * Rutas relacionadas con la gestión de estadios.
 * @module routes/stadiums
 */

const {
  findAll,
  findById,
  findByObjectId,
  save,
  update,
  deleteStadiumById
} = require('../controllers/stadiums')

/**
 * Define la ruta para obtener todos los estadios.
 * @name GET/api/stadiums
 * @function
 */
routes.get("/", findAll)

/**
 * Define la ruta para obtener un estadio por su identificador único.
 * @name GET/api/stadiums/:id
 * @function
 * @param {string} id - Identificador único del estadio.
 */
routes.get("/:id",findById)

/**
 * Define la ruta para obtener un estadio por su identificador único y popula la información de la ciudad asociada.
 * @name GET/api/stadiums/:id/city
 * @function
 * @param {string} id - Identificador único del estadio.
 */
routes.get("/:id",findByObjectId)

/**
 * Define la ruta para crear un nuevo estadio asociado a una ciudad.
 * @name POST/api/stadiums/:id
 * @function
 * @param {string} id - Identificador único de la ciudad a la que se asociará el estadio.
 */
routes.post("/:id", save)

/**
 * Define la ruta para actualizar los detalles de un estadio por su identificador único.
 * @name PUT/api/stadiums/:id
 * @function
 * @param {string} id - Identificador único del estadio.
 */
routes.put("/:id", update)

/**
 * Define la ruta para eliminar un estadio por su identificador único y lo quita de la ciudad asociada.
 * @name DELETE/api/stadiums/:id
 * @function
 * @param {string} id - Identificador único del estadio.
 */
routes.delete('/:id', deleteStadiumById)

module.exports = routes;