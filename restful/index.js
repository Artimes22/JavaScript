const express = require('express');
const consing = require('consign');

let app = express();

consing().include('routes').into(app);

app.listen(3000, '127.0.0.1', ()=>{

    console.log("Servidor esta no ar");

});