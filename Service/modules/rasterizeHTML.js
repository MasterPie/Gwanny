var phantom = require('phantom');
var fs = require('fs');

module.exports = function(html, clog) {
	var rastHTML = function(callback) {
		phantom.create(function (ph) {
			ph.createPage(function (page) {
			    page.open(html, function (status) {
			      console.log("opened" + html, status);
			      page.render('example.png');
			      callback(clog);
			      ph.exit();
			    })
			});
		});
	};

	var convert = function(clog) {
		var base64_data = new Buffer(fs.readFileSync('example.png')).toString('base64');
		clog(base64_data);
		// return base64_data;
	}

	rastHTML(convert);
}