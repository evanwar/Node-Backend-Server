

const express = require('express');

require('dotenv').config();

var cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();


app.use(cors());

//Lectura y parseo del body

app.use(express.json());

dbConnection();

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Sevidor corriendo port:' + port);

});