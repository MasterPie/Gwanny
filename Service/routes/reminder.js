var express = require('express');
var router = express.Router();

var apiKey = "Token ebe82805d059f2f355a4ff03d317b8070eb910a0";
var currentName = "philly";
var baseURL = "api.everyblock.com";

var http = require('https');

/* POST make call */
router.get('/', function(req, res, next) {
	
	var response = {
		todos: 
		[
			{
				time: "9:00 AM",
				items: [
					{
						name: "Medication 1",
						description: "Take 2 pills after breakfast"
					},
					{
						name: "Medication 2",
						description: "One fish oil."
					}
				]
			},
			{
				time: "12:00 PM",
				items: [
					{
						name: "Something else",
						description: "Take 2 pills after breakfast"
					},
					{
						name: "Another thing else",
						description: "One fish oil."
					}
				]
			}
		]
	};
	
	res.render("reminder.html", response);
	
});

module.exports = router;
