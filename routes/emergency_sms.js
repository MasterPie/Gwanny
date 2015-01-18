var express = require('express');
var router = express.Router();

var request = require('request');

var accId = "AC8c9bbd1b0fdc3b2118739b0e17ae69ad";
var apikey = "d717c8198e59240db765934126ea0763";
var baseURL = "https://api.twilio.com/2010-04-01/Accounts/" + accId;

/* POST make call */
router.get('/', function(req, res, next) {
	
	var options = {
			url: baseURL +'/Messages.json', 
			port:443,
			method:'POST',
			auth :{
				user : accId,
				pass : apikey 
			},
			headers : 
				{
					Accept: '*/*',
					'Content-Type': 'application/json'
				},
			json: true,
			form: {
				To: "8579193567",
				From: "+18572731783",
				Body: "[Mago] I Need Help!"
			}
		
		};
	
	request.post(options, function(error, response, body){
		if (!error){
			console.log("statusCode: ", response.statusCode);
			var quote = body;
			
			console.log(quote);
					
			var data = {						
				//duration : body["duration"],
				//fee : body2["fee"]
			};
			
			//res.render("pizza.html", data);	
		}
	});
});

module.exports = router;
