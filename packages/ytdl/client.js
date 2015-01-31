YouTube = {
	lookup: function (url, options, callback) {
		if (_.isFunction(options) && typeof callback === "undefined") {
			callback = options;
			options = {};
		}
		
		callback = callback || log;
		
		Meteor.call("YouTube/getStream", url, options, function (err, res) {
			err = err || res.err; // future can also return a normal object

			if (err) return console.warn(err);
			callback(err, res.stream.url, res.info);
		});
	}
};


function log (message, message2) {
	console.log(message, message2);
}