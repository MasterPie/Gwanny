var phantom = require('phantom');
var fs = require('fs');
var base64 = require('base64-js');
var PNG = require('png-js'); // read pixel by pixel
var gm = require('gm'); // graphics magic
var im = require('imagemagick'); //imagemagick
var sprintf = require('sprintf-js').sprintf; //string formatting
var getPixels = require("get-pixels");

module.exports = function(html, clog) {
	var rastHTML = function(callback) {
		phantom.create(function (ph) {
			ph.createPage(function (page) {
			    page.open(html, function (status) {
			      console.log("opened " + html, status);
			      page.render('example.png');
			      setTimeout(function() {
				      callback(clog);
			      }, 500);
			      ph.exit();
			    })
			});
		});
	};

	var convert = function(clog) {
		// var base64_data = new Buffer(fs.readFileSync('example.png')).toString('base64');

		// gm("example.png").monochrome();
			im.convert(['example.png', '-monochrome', '-depth', '1', '-type', 'Bilevel', 'blacknwhite.png'], function(err, stdout) {
				if (err) throw err;
			});

			setTimeout(function() {
				im.resize({
				srcPath: 'blacknwhite.png',
				dstPath: 'blacknwhite-small.png',
				width: 300
				}, function(err, stdout, stderr) {
					if (err) throw err;
				});
			}, 100);
			
			var wstream = fs.createWriteStream('myOutput2.txt');
			var width, height;
			var counter = 0;

			setTimeout(function() {
				im.identify(['-format', '%w', 'blacknwhite-small.png'], function(err, output) {
					width = output;
				});

				im.identify(['-format', '%h', 'blacknwhite-small.png'], function(err, output) {
					height = output;
				});
			}, 300);
			

			setTimeout(function(){
				getPixels('blacknwhite-small.png', function(err, pixels) {

				var i = 0, n = 0, y = 0;
				var rowBytes = Math.floor((parseInt(width) + 7) / 8);
				var totalBytes = rowBytes * parseInt(height);

				for(; y < height; y++) { // Each row...
				    wstream.write("\n  ");
				    for(var x = 0; x < rowBytes; x++) { // Each 8-pixel block within row...
						var lastBit = (x < rowBytes - 1) ? 1 : (1 << (rowBytes * 8 - width));
						var sum = 0; // Clear accumulated 8 bits
						for (var b = 128; b >= lastBit; b >>= 1) { // Each pixel within block...
							if ((pixels[i++] & 1) === 0) {
								sum = sum | b; // If black pixel, set bit
							}
						};
						wstream.write(sprintf("0x%02X", sum)); // Write accumulated bits
						if( ++n < totalBytes) wstream.write(',');
				    }
				  }

			 
				// for (var i = 0; i < pixels.length; i++) {
				// 	wstream.write("0x" + pixels[i].toString(16) + ", ");
				// }

				});

			}, 500);
			

		// clog(byte_array);
	}

	rastHTML(convert);
}