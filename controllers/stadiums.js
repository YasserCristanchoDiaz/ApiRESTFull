const Stadium = require('../models/model-stadiums')
const City = require('../models/model-city')

module.exports = {
  findAll: async (req, res) => {
    try {
      const data = await Stadium.find({})

      return res.status(200).json({ "state": true, "data": data })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ "state": false, "error": error })
    }
  },

  save: async (req, res) => {
    const { id } = req.params;
    const city = await City.findById(id)
    console.log(city)
    if (city) {
      try {
        const stadium = new Stadium(req.body)
        stadium.city = city
        const data = await stadium.save()

        city.stadiums.push(stadium)
        await city.save()

        return res.status(200).json({ "state": true, data: data })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ "state": false, "error": "Error al guardar el estadio", "details": error.message })
      }
    } else {
      return res.status(400).json({ "state": false, "error": "La ciudad no existe" })
    }

  },
  update: async (req, res) => {
    const { id } = req.params;

    try {
      const stadium = await Stadium.findById(id);

      if (!stadium) {
        return res.status(404).json({ "state": false, "error": "Estadio no encontrado" });
      }
      stadium.name = req.body.name || stadium.name;
      stadium.capacity = req.body.capacity || stadium.capacity;
      stadium.team = req.body.team || stadium.team;

      if (req.body.cityId) {
        const newCity = await City.findById(req.body.cityId);
        if (!newCity) {
          return res.status(400).json({ "state": false, "error": "La nueva ciudad no existe" });
        }
        stadium.city = newCity;
      }
      const updatedStadium = await stadium.save();

      return res.status(200).json({ "state": true, "data": updatedStadium });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ "state": false, "error": "Error al actualizar el estadio", "details": error.message });
    }
  },
  deleteStadiumById: async (req, res) => {
    const { id } = req.params;

    try {
      const stadium = await Stadium.findByIdAndDelete(id);

      if (!stadium) {
        return res.status(404).json({ "state": false, "error": "Estadio no encontrado" });
      }

      // Eliminar la referencia del estadio del vector stadiums de la ciudad
      const city = await City.findById(stadium.city);
      city.stadiums.pull(id);
      await city.save();

      return res.status(200).json({ "state": true, "message": "Estadio eliminado exitosamente" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ "state": false, "error": "Error al eliminar el estadio", "details": error.message });
    }
  }
}