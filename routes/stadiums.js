const routes = require('express').Router()

const {
  findAll,
  findById,
  findByObjectId,
  save,
  update,
  deleteStadiumById
} = require('../controllers/stadiums')

routes.get("/", findAll)

routes.get("/:id",findById)

routes.get("/:id",findByObjectId)

routes.post("/:id", save)

routes.put("/:id", update)

routes.delete('/:id', deleteStadiumById)

module.exports = routes;