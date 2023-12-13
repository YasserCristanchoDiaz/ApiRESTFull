const City = require('../models/model-city')

module.exports = {
    findAll : async(req,res) => {
        try {
            const data = await City.find({}).populate('stadiums')

            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },
    findById : async(req,res) => {
        const {id} = req.params
        try {
            const data = await City.findById(id)
            
            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },
    findByObjectId :async(req,res)=>{
        const {id}=req.params
        try {
           
           const data = await City.findById(id).populate('stadiums');
            return res.status(200).json({"state":true, "data": data})
       } catch (error) {
        console.log(error)
        return res.status(500).json({"state":false,"error":error})
       }
    },
    save : async (req,res)=>{
        const city = new City(req.body)
        
    
        try {
            const data = await city.save()

            return res.status(200).json({"state":true, "data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },
    update : async(req,res)=>{
        const {id} = req.params;
        const newData= req.body;
        try {
            const updatedData= await City.findOneAndUpdate({id:id},newData,{new:true});
            if (updatedData) {
                return res.status(200).json({ "state": true, "data": updatedData });
            } else {
                return res.status(404).json({ "state": false, "error": "Documento no encontrado" });
            }        } catch (error) {
            return res.status(500).json({"state":false,"error":error}) 
        }

    }
}