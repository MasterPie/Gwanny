var WunderNodeClient = require("wundernode");
var URL = require('url');

var express = require('express');
var router = express.Router();
var debug = false;

// Definitions

// Replace this with your API KEY
var apikey = "9a8d3cbdeed6b673";

var wunder = new WunderNodeClient(apikey, debug,  10, 'minute');

/* POST make call */
router.get('/', function(req, res, next) {
	//res.send('add to queue'); //do something
	
	var query = "PA/Philadelphia";
	
	wunder.forecast(query, function(err, obj){
		var response = JSON.parse(obj);
		var today = response["forecast"]["simpleforecast"]["forecastday"][0];
		
		var forecast = {
			"low" : today["low"],
			"high" : today["high"],
			"conditions" : today["conditions"]
		};
	
		 //console.log(response);
		res.render("forecast.html", forecast);
	});	
});

module.exports = router;
