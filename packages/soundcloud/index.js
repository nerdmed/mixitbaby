var client_id = "b45b1aa10f1ac2941910a7f0d10f8e28";

Soundcloud = {
	lookup: lookup,
	makeAPICall: makeAPICall,
	setAPIKey: setAPIKey
};

function lookup (url, callback) {
	HTTP.get("https://api.soundcloud.com/resolve?url=" + url + "&_status_code_map%5B302%5D=200&_status_format=json&client_id=" + client_id + "&app_version=55980ac5", function (err, res) {
		if (err) return console.warn("Error!", err);
		makeAPICall(res.data.location, callback);
	});
}

function makeAPICall (location, callback) {
	callback = callback || log;
	HTTP.get(location, function (err, res) {
		if (err) return console.warn("Error", err);
		console.log(res.data);
		callback(res.data.stream_url + "?client_id=" + client_id);
	});
}

function setAPIKey (key) {
	client_id = key;
}

function log (message) {
	console.log(message);
}