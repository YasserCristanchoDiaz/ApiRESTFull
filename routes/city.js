const routes = require('express').Router()

const {
    findAll,
    findById,
    save,
    update
} = require ('../controllers/cities')

routes.get("/",findAll)

routes.get("/:id",findById)

routes.post("/",save)

routes.put("/update/:id",update)

module.exports = routes;