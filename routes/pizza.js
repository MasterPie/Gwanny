var express = require('express');
var router = express.Router();

var request = require('request');


var customerID = "cus_KAggiIVvXOZHd-";
var apikey = "df0b86ad-33ea-4278-a8b5-1a2c718438ac";
var baseURL = "https://api.postmates.com/v1/customers/" + customerID;

/* POST make call */
router.get('/', function(req, res, next) {
	
	var options = {
			url: baseURL +'/delivery_quotes', 
			port:443,
			method:'POST',
			auth :{
				user : apikey,
				pass : '' 
			},
			headers : 
				{
					Accept: '*/*',
					'Content-Type': 'application/json'
				},
			json: true,
			form: {
				pickup_address: "4438 Chestnut Street, Philadelphia, PA 19104",
				dropoff_address: "University of Pennsylvania, Philadelphia, PA 19104"
			}
		
		};
	
	request.post(options, function(error, response, body){
		if (!error){
			console.log("statusCode: ", response.statusCode);
			var quote = body;
			
			console.log(quote);
			
			var options2 = {
						url: baseURL +'/deliveries', 
						port:443,
						method:'POST',
						auth :{
							user : apikey,
							pass : '' 
						},
						headers : 
							{
								Accept: '*/*',
								'Content-Type': 'application/json'
							},
						json: true,
						form: {
							manifest: "Pizza",
							pickup_name: "Dominos",
							pickup_address: "4438 Chestnut Street, Philadelphia, PA 19104",
							pickup_phone_number: "(646) 545-3434",
							pickup_business_name: "Dominos Pizza",
							pickup_notes: "1 Large Cheese Pizza",
							dropoff_name: "Pam Olive",
							dropoff_address: "University of Pennsylvania, Philadelphia, PA 19104",
							dropoff_phone_number: "(753) 435-4732",
							dropoff_notes: "Please knock on the door",
							quote_id: quote["id"],
						}
					};	
			
		
			request.post(options2, function(error2, response2, body2){
				if (!error2){
					console.log("statusCode: ", response2.statusCode);
					console.log(body2);
				}
			});
		}
	});
});

module.exports = router;
