let express = require('express');
let routes = express.Router();

routes.get('/', (req, res) =>{

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

routes.get('/admin', (req, res)=>{

    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.json({
        users: []
    });


});

module.exports = routes;