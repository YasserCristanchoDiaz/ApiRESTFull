const Stadium = require('../models/model-stadiums')
const City = require('../models/model-city')

module.exports = {
  findAll : async(req,res)=>{
    try {
      const data = await Stadium.find({})

      return res.status(200).json({"state":true,"data":data})
    } catch (error) {
      console.log(error)
      return res.status(500).json({"state":false,"error":error})
    }
  },

  save : async(req,res)=>{
    const {id} = req.params;
    const city = await City.findById(id)
    console.log(city)
    if (city) {
      try {
        const stadium = new Stadium(req.body)
        stadium.city = city
        const data = await stadium.save()
  
        city.stadiums.push(stadium)
        await city.save()
  
        return res.status(200).json({"state":true,data:data})
      } catch (error) {
        console.log(error)
        return res.status(500).json({"state":false,"error": "Error al guardar el estadio", "details": error.message })
      }
    } else {
      return res.status(400).json({"state":false, "error":"La ciudad no existe"})
    }
    
  }
}