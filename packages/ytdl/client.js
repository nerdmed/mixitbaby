YouTube = {
	lookup: function (url, options, callback) {
		callback = callback || log;
		Meteor.call("YouTube/getStream", url, options, function (err, res) {
			console.log(err, res);
			callback(res.stream.url);
		});
	}
};


function log (message) {
	console.log(message);
}