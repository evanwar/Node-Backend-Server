

const express = require('express');

require('dotenv').config();

var cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

dbConnection();


const port = process.env.PORT;

app.get('/', (req, res) => {

    res.json({
        ok: true,
        msj: 'Hola Mundo!'
    });

});

app.listen(port, () => {
    console.log('Sevidor corriendo port:' + port);

});