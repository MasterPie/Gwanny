require("require.async")(require);

var express = require('express');
var Q = require('q');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var htmlAddress = "http://www.google.com";

	require('../modules/rasterizeHTML.js')(htmlAddress, function(output) {
		console.log(output); //Change console.log to some output mechanism to the printer
	})

	res.render('index', { title: 'Express' });
});

module.exports = router;
