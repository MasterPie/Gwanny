var express = require('express');
var router = express.Router();

/* POST make call */
router.get('/:contactId', function(req, res, next) {
	var contactId = req.param("contactId");
	
	//res.send('add to queue'); //do something
	
	var response = {
		weather: "58 degrees"
	};
	
	res.render("call_made.html", response);
	
});

module.exports = router;
