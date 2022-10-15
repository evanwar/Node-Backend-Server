const mongoose = require('mongoose');

async function dbConnection() {

    try {
        await mongoose.connect(process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify:false,
                useCreateIndex: true
            }
        );

        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la BD');
    }


}


module.exports = {
    dbConnection
}

