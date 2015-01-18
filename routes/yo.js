var express = require('express');
var router = express.Router();

var request = require('request');


var apikey = "6e17cbd9-cff9-4b60-9bc5-28e85d02037a";
var baseURL = "https://api.justyo.co/";

/* POST make call */
router.get('/', function(req, res, next) {
	
	var options = {
			url: baseURL +'/yo/', 
			port:443,
			method:'POST',
			headers : 
				{
					Accept: '*/*',
					'Content-Type': 'application/json'
				},
			form:{
				username: "MASTERPIE",
				api_token: apikey
			}
		};
	
	request.post(options, function(error, response, body){
		if (!error){
			console.log("statusCode: ", response.statusCode);
			var quote = body;
			
			console.log(quote);
				
			res.end(quote);
			//res.render("pizza.html", data);
		}
	});
});

module.exports = router;
