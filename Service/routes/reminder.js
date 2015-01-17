var express = require('express');
var router = express.Router();

var apiKey = "Token ebe82805d059f2f355a4ff03d317b8070eb910a0";
var currentName = "Philadelphia";
var baseURL = "https://api.everyblock.com";

var http = require('http');

/* POST make call */
router.get('/', function(req, res, next) {
	
	//res.send('add to queue'); //do something
console.log("about to create client object");	
	var client = http.request(80, baseUrl + "/content/" + currentName + "/topnews/");
console.log("create client object");	
	var header = {'Host': 'api.everyblock.com', 'Authorization' : apiKey};	
	var request = client.request('GET', '/', header);
console.log("created request");
	
	request.on('response', function (response) {
	  console.log('STATUS: ' + response.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(response.headers));
	  response.setEncoding('utf8');
	  response.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	  });
	});
	
	
	console.log(request);
	/*
	http.get(baseUrl + "/content/" + currentName + "/topnews/", function(res){
		var body = '';
		
		res.on('data', function(chunk){
			body += chunk;
		});
		
		res.on('end', function(){
			var response = JSON.parse(body)
			console.log(response);
		});
	});
	*/

	
	res.render("call_made.html", {});
	
});

module.exports = router;
