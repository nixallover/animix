var express = require('express');
var router = express.Router();
var game = require('../models/game');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', game);
});

module.exports = router;
