const express = require('express');

let app = express();

app.get('/', (req, res) =>{

    res.statusCode = 200;
    res.setHeader('content-Type', 'text/html');
    res.end('<h1>Olá</h1>')

});

app.get('/users', (req, res) =>{

    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.json({
        users: [{
        name: 'Artimes',
        email: 'artimes.flima@gmail.com',
        id: 1

        }]
    });

});

app.listen(3000, '127.0.0.1', ()=>{

    console.log("Servidor esta no ar");

});