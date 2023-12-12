const routes = require('express').Router()

const {
  findAll,
  save
} = require('../controllers/stadiums')

routes.get("/",findAll)

routes.post("/:id",save)

module.exports = routes;