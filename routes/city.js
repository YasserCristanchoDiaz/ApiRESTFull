const routes = require('express').Router()

const {
    findAll,
    findById,
    findByObjectId,
    save,
    update,
    deleteCityById
} = require ('../controllers/cities')

routes.get("/",findAll)

routes.get("/:id",findById)

routes.get("/:id",findByObjectId)

routes.post("/",save)

routes.put("/:id",update)

routes.delete("/:id", deleteCityById)

module.exports = routes;