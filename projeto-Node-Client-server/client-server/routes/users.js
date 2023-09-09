var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

// Creates a JSON client
var client = restify.createJsonClient({
  url: 'http://localhost:4000' // Alterado para a porta correta
});

/* GET users listing. */

router.get('/users', function (req, res, next) {
  client.get('/users', function (err, request, response, obj) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: 'Erro na requisição'
      });
    }

    console.log(obj);
    res.status(200).json(obj);
  });
});

module.exports = router;