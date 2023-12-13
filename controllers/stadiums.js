const Stadium = require('../models/model-stadiums')
const City = require('../models/model-city')

/**
 * Controlador para gestionar operaciones relacionadas con los estadios y sus ciudades asociadas.
 * @module controllers/stadiums
 */
module.exports = {
  /**
     * Obtiene todos los estadios.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos de todos los estadios.
     */
  findAll: async (req, res) => {
    try {
      const data = await Stadium.find({})
      return res.status(200).json({ "state": true, "data": data })
    } catch (error) {
      return res.status(500).json({ "state": false, "error": error })
    }
  },

  /**
     * Obtiene un estadio por su ID.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con el ID del estadio.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos del estadio encontrado.
     */
  findById: async (req, res) => {
    const { id } = req.params
    try {
      const data = await Stadium.findById(id)
      return res.status(200).json({ "state": true, "data": data })
    } catch (error) {
      return res.status(500).json({ "state": false, "error": error })
    }
  },

  /**
     * Obtiene un estadio por su ID con información sobre su atributos.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con el ID del estadio.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos detallados del estadio.
     */
  findByObjectId: async (req, res) => {
    const { id } = req.params
    try {
      const data = await Stadium.findById(id);
      return res.status(200).json({ "state": true, "data": data })
    } catch (error) {
      return res.status(500).json({ "state": false, "error": error })
    }
  },

  /**
     * Guarda un nuevo estadio relacionado a una ciudad.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con el ID de la ciudad y datos del estadio.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos del estadio guardado.
     */
  save: async (req, res) => {
    const { id } = req.params;
    const city = await City.findById(id)
    if (city) {
      try {
        const stadium = new Stadium(req.body)
        stadium.city = city
        const data = await stadium.save()
        city.stadiums.push(stadium)
        await city.save()
        return res.status(200).json({ "state": true, data: data })
      } catch (error) {
        return res.status(500).json({ "state": false, "error": "Error al guardar el estadio", "details": error.message })
      }
    } else {
      return res.status(400).json({ "state": false, "error": "La ciudad no existe" })
    }
  },

  /**
     * Actualiza un estadio por su ID y permite la actualización de la ciudad relacionada.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con el ID del estadio y datos actualizados.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos del estadio actualizado.
     */
  update: async (req, res) => {
    const { id } = req.params
    try {
      const stadium = await Stadium.findById(id)
      if (!stadium) {
        return res.status(404).json({ "state": false, "error": "Estadio no encontrado" })
      }
      stadium.name = req.body.name || stadium.name
      stadium.capacity = req.body.capacity || stadium.capacity
      stadium.team = req.body.team || stadium.team
      if (req.body.cityId) {
        const newCity = await City.findById(req.body.cityId)
        if (!newCity) {
          return res.status(400).json({ "state": false, "error": "La nueva ciudad no existe" })
        }
        stadium.city = newCity
      }
      const updatedStadium = await stadium.save()
      return res.status(200).json({ "state": true, "data": updatedStadium });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ "state": false, "error": "Error al actualizar el estadio", "details": error.message });
    }
  },

  /**
     * Elimina un estadio por su ID y actualiza la lista de estadios relacionado a la ciudad.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con el ID del estadio.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y mensaje de eliminación.
     */
  deleteStadiumById: async (req, res) => {
    const { id } = req.params
    try {
      const stadium = await Stadium.findByIdAndDelete(id)
      if (!stadium) {
        return res.status(404).json({ "state": false, "error": "Estadio no encontrado" })
      }
      const city = await City.findById(stadium.city)
      city.stadiums.pull(id)
      await city.save()
      return res.status(200).json({ "state": true, "message": "Estadio eliminado exitosamente" })
    } catch (error) {
      return res.status(500).json({ "state": false, "error": "Error al eliminar el estadio", "details": error.message })
    }
  }
}