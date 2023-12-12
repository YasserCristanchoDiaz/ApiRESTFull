const express = require('express')

const app = express()

//connect-DB
require('./drivers/connect-db')

//setters
app.set('PORT',process.env.PORT || 3000 )

//middlewares
app.use(express.json())

app.use("/city", require('./routes/city'))
app.use("/stadiums", require('./routes/stadiums'))

app.listen(app.get('PORT'),()=>console.log(`Sever Listen to Port ${app.get('PORT')}`))