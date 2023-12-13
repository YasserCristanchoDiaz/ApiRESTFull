const routes = require('express').Router()

const {
  findAll,
  save,
  update,
  deleteStadiumById
} = require('../controllers/stadiums')

routes.get("/", findAll)

routes.post("/:id", save)

routes.put("/:id", update)

routes.delete('/:id', deleteStadiumById)

module.exports = routes;