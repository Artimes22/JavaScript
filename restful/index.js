const express = require('express');
const consing = require('consign');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

consing().include('routes').include('utils').into(app);

app.listen(3000, '127.0.0.1', ()=>{

    console.log("Servidor esta no ar");

});