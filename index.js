const express = require('express')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

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

const options = {
    swaggerDefinition: {
        info: {
            title: 'API de Gestion de Estadios',
            version: '1.0.0',
            description: 'API de gestionar información acerca de los estadios',
        }
    },
    apis: ['swagger.yaml']
}

const swaggerUiOptions = {
    cusstomCss: ".scheme-container {display: none}"
}

const specs = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions))