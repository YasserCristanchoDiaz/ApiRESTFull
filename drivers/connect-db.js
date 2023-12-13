const mongoose = require('mongoose')

/**
 * Módulo que gestiona la conexión a la base de datos MongoDB utilizando Mongoose.
 * @module drivers/connect-db
 */

//Conexión local
//const URI = "mongodb://127.0.0.1:27017/cityStadiums"

//User: yassercristancho
//password: Um2MGPF0r7scKEnL
//conexión remota (MongoDB Atlas)
const URI = "mongodb+srv://yassercristancho:Um2MGPF0r7scKEnL@test.qvjpixm.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)

/*const options = {
    useNewUrlParser:true, useUnifiedTopology:true
}*/

/**
 * Conecta a la base de datos MongoDB utilizando la URL proporcionada.
 * @function
 * @async
 * @returns {Promise<void>} - Una promesa que se resuelve una vez que la conexión es exitosa.
 * @throws {Error} - Error si la conexión a la base de datos falla.
 */
mongoose.connect(URI)
    .then(()=>console.log('Connect DB Success'))
    .catch( e => console.log(e))

module.exports = mongoose