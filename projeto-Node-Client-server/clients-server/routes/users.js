let express = require('express');
let assert = require('assert');
let restify = require('restify-clients');
let router = express.Router();

// Creates a JSON client
let client = restify.createJsonClient({
  url: 'http://localhost:4000/users'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.get('/users', function(err, request, response, obj) {
    assert.ifError(err);
  
    res.end(JSON.stringify(obj, null, 2));
  });;
});

module.exports = router;
