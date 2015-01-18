var express = require('express');
var router = express.Router();

var request = require('request');


var apikey = "6e17cbd9-cff9-4b60-9bc5-28e85d02037a";
var baseURL = "https://api.justyo.co/";
var yo_username = "MASTERPIE";

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
				username: yo_username,
				api_token: apikey
			}
		};
	
	request.post(options, function(error, response, body){
		if (!error){
			console.log("statusCode: ", response.statusCode);
			var quote = body;
			
			console.log(quote);
			console.log(yo_username);
			res.end(quote);
			//res.render("pizza.html", data);
		}
	});
});

router.get('/:yoId', function(req, res, next){
	var new_id = req.params.yoId;

	yo_username = new_id;
	
	res.send("");
});

module.exports = router;
