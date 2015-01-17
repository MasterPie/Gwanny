var express = require('express');
var router = express.Router();

/* POST make call */
router.post('/:contactId', function(req, res, next) {
	var contactId = req.param("contactId");
	
	res.send('add to queue'); //do something
});

module.exports = router;
