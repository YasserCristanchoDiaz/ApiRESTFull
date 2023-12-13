const routes = require('express').Router()

const {
  findAll,
  save,
  update
} = require('../controllers/stadiums')

routes.get("/", findAll)

routes.post("/:id", save)

routes.put("/:id", update)

module.exports = routes;