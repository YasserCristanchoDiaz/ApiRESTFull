const mongoose = require('mongoose')

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

mongoose.connect(URI)
    .then(()=>console.log('Connect DB Success'))
    .catch( e => console.log(e))

module.exports = mongoose