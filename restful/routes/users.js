module.exports = (app) => {

    app.get('/users', (req, res) => {

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

    app.get('/users/admin', (req, res) => {

        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json({
            users: []
        });


    });

};