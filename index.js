const express = require('express')
const cors = require('cors')

const app = express()

//Connect-DB
require('./drivers/connect-db')

//Setters
app.set('PORT',process.env.PORT || 3000 )

//Middlewares
app.use(express.json())
app.use(cors())

//Definición de rutas para la gestión de ciudades y estadios
app.use("/city", require('./routes/city'))
app.use("/stadiums", require('./routes/stadiums'))

//Ejecución del servidor
app.listen( app.get('PORT'),()=>console.log(`Sever Listen to Port ${app.get('PORT')}`))