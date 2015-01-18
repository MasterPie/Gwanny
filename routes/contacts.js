var express = require('express');
var router = express.Router();

var http = require('https');

/* POST make call */
router.get('/', function(req, res, next) {
	
	var response = {
		contacts: 
		[
			{
				name: "Rosina Rodriguez",
				relation: "MATCHMAKER",
				number: "(412) 987-6543"
			},
			{
				name: "Shawn Xu",
				relation: "SON",
				number: "(623) 343-7423"
			},
			{
				name: "Tofi Buzali",
				relation: "WIZARD",
				number: "(347) 585-4742"
			},
			{
				name: "Vivek Pai",
				relation: "TROUBLEMAKER",
				number: "(662) 637-9336"
			}
		]
	};
	
	res.render("contacts.html", response);
	
});

module.exports = router;
