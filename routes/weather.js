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
		//console.log( response["forecast"]);
		var today = response["forecast"]["simpleforecast"]["forecastday"][0];
		//console.log(today);
		
		wunder.conditions(query, function(err2, obj2){
			var response2 = JSON.parse(obj2);
	
		var todayConditions = response2["current_observation"];
	console.log(todayConditions);
			var forecast = {
				"low" : today["low"],
				"high" : today["high"],
				"current" : todayConditions["temp_f"],
				"conditions" : today["conditions"]
			};
		
			 //console.log(response);
			res.render("weather.html", forecast);
			
		});
	});	
});

module.exports = router;
