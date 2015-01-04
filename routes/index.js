var express = require('express');
var router = express.Router();
var mainMenu = require('../models/mainMenu');
var play = require('../models/play');
var collections = require('../models/collections');
var options = require('../models/options');
var about = require('../models/about');

/* main menu (default) */
router.get('/', function(req, res) {
  res.render('mainMenu', mainMenu);
});

/* play a round */
router.get('/play', function(req, res) {
  res.render('play');
});

/* collections */
router.get('/collections', function(req, res) {
  res.render('collections', collections);
});

/* user options */
router.get('/options', function(req, res) {
  res.render('options', options);
});

/* about */
router.get('/about', function(req, res) {
  res.render('about', about);
});

module.exports = router;
