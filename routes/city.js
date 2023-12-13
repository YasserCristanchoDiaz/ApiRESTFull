const routes = require('express').Router()

/**
 * Rutas relacionadas con la gestión de ciudades.
 * @module routes/city
 */

const {
    findAll,
    findById,
    findByObjectId,
    save,
    update,
    deleteCityById
} = require ('../controllers/cities')

/**
 * Define la ruta para obtener todas las ciudades con sus estadios asociados.
 * @name GET/api/city
 * @function
 */
routes.get("/",findAll)

/**
 * Define la ruta para obtener una ciudad por su identificador único.
 * @name GET/api/city/:id
 * @function
 * @param {string} id - Identificador único de la ciudad.
 */
routes.get("/:id",findById)

/**
 * Define la ruta para obtener una ciudad y sus estadios asociados por su identificador único.
 * @name GET/api/city/:id/stadiums
 * @function
 * @param {string} id - Identificador único de la ciudad.
 */
routes.get("/:id",findByObjectId)

/**
 * Define la ruta para crear una nueva ciudad.
 * @name POST/api/city
 * @function
 */
routes.post("/",save)

/**
 * Define la ruta para actualizar los detalles de una ciudad por su identificador único.
 * @name PUT/api/city/:id
 * @function
 * @param {string} id - Identificador único de la ciudad.
 */
routes.put("/:id",update)

/**
 * Define la ruta para eliminar una ciudad y sus estadios asociados por su identificador único.
 * @name DELETE/api/city/:id
 * @function
 * @param {string} id - Identificador único de la ciudad.
 */
routes.delete("/:id", deleteCityById)

module.exports = routes;