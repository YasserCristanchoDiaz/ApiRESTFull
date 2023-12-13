const City = require('../models/model-city')
const Stadium = require('../models/model-stadiums')

/**
 * Controlador para gestionar operaciones relacionadas con las ciudades y estadios.
 * @module controllers/cities
 */
module.exports = {
    /**
     * Obtiene todas las ciudades con información de los estadios asociados.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos de las ciudades con estadios.
     */
    findAll: async (req, res) => {
        try {
            const data = await City.find({}).populate('stadiums')

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    /**
     * Obtiene una ciudad por su ID.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con el ID de la ciudad.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos de la ciudad encontrada.
     */
    findById: async (req, res) => {
        const { id } = req.params
        try {
            const data = await City.findById(id)
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    /**
     * Obtiene una ciudad por su ID con información de los estadios asociados.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con el ID de la ciudad.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos de la ciudad y sus estadios asociados.
     */
    findByObjectId: async (req, res) => {
        const { id } = req.params
        try {
            const data = await City.findById(id).populate('stadiums');
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    /**
     * Guarda una nueva ciudad.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con los datos de la nueva ciudad.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos de la ciudad guardada.
     */
    save: async (req, res) => {
        const city = new City(req.body)
        try {
            const data = await city.save()

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    /**
     * Actualiza una ciudad por su ID.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con el ID de la ciudad y los datos actualizados.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y datos de la ciudad actualizada.
     */
    update: async (req, res) => {
        const { id } = req.params;
        const newData = req.body;
        try {
            const updatedData = await City.findByIdAndUpdate({ _id: id }, newData, { new: true })
            if (updatedData) {
                return res.status(200).json({ "state": true, "data": updatedData });
            } else {
                return res.status(404).json({ "state": false, "error": "Documento no encontrado" })
            }
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    /**
     * Elimina una ciudad por su ID y sus estadios relacionados a la ciudad.
     * @function
     * @async
     * @param {Object} req - Objeto de solicitud de Express con el ID de la ciudad.
     * @param {Object} res - Objeto de respuesta de Express.
     * @returns {Object} - Respuesta JSON con el estado y mensaje de eliminación.
     */
    deleteCityById: async (req, res) => {
        const { id } = req.params
        try {
            const deletedCity = await City.findByIdAndDelete(id)

            if (!deletedCity) {
                return res.status(404).json({ "state": false, "error": "Ciudad no encontrada" })
            }
            await Stadium.deleteMany({ city: deletedCity._id })

            return res.status(200).json({ "state": true, "message": "Ciudad y estadios relacionados eliminados exitosamente" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ "state": false, "error": "Error al eliminar la ciudad", "details": error.message })
        }
    }
}