var express = require('express');
var router = express.Router();

var apiKey = "Token ebe82805d059f2f355a4ff03d317b8070eb910a0";
var currentName = "philly";
var baseURL = "api.everyblock.com";

var http = require('https');

/* POST make call */
router.get('/', function(req, res, next) {
	
	//res.send('add to queue'); //do something

	//var client = http.request(80, baseURL + "/content/" + currentName + "/topnews/");
	var options = {
		'host': baseURL, 
		'path' : "/content/" + currentName + "/topnews", 
		'port':443,
		'method':"GET",
		'headers' : 
			{
				'Authorization' : apiKey,
				'Accept': "application/json",
				'Content-Type': "application/json",
				'Host': baseURL
			}
	};	
	//var request = client.request('GET', '/', header);
	/*
	request.on('response', function (response) {
	  console.log('STATUS: ' + response.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(response.headers));
	  response.setEncoding('utf8');
	  response.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	  });
	});
	*/
	
	//console.log(request);
	
	var request = http.request(options, function(response){
	
	console.log(response);
		var body = '';
		
		response.on('data', function(chunk){
			body += chunk;
			console.log("data");
		});
		
		response.on('end', function(){
		console.log(body);
			//var response = JSON.parse(body)
			//console.log(response);
			res.end(body);
		});
	}).on("error", function(e){
		console.log("Error: " + e.message);
	});
	
	request.end();


	//res.render("call_made.html", {});
	
});

module.exports = router;
