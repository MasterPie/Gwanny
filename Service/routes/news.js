var express = require('express');
var router = express.Router();

var apiKey = "Token ebe82805d059f2f355a4ff03d317b8070eb910a0";
var currentName = "philly";
var baseURL = "api.everyblock.com";

var request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/* POST make call */
router.get('/', function(req, res, next) {
		
	var options = {
		url: 'https://' + baseURL +'/content/' + currentName + '/topnews', 
		port:443,
		method:'GET',
		headers : 
			{
				Authorization : apiKey,
				Accept: '*/*',
				'Content-Type': 'application/json'
			}
	};	
	
	request.get(options, function(error, response, body){
		if (!error){
			console.log("statusCode: ", response.statusCode);
			var newsItems = JSON.parse(body)["results"];
			
			var newsEvents = {
				firstNews : newsItems[0],
				secondNews :newsItems[1]
			};
			
			console.log(newsEvents);
			
			res.render("news-events.html", newsEvents);
		}
	});

	//res.render("call_made.html", {});
	
});

module.exports = router;
