// Write your package code here!

var ytdl = Npm.require('ytdl-core');
var Future = Npm.require('fibers/future');


Meteor.methods({
	"YouTube/getStream": function (url, options) {
		options = options || {};
		var future = new Future();

		ytdl(url || "https://www.youtube.com/watch?v=bQz3A8qy0VE", {
			filter: function (f) {
				return (f.audioEncoding === (options.audioEncoding || "aac")
					 && f.audioBitrate == (options.audioBitrate || 128));
			}
		}).on("info", function (info, stream) {
			future.return({info: info, stream: stream});
		}).on("error", function (err) {
			future.return({err: err}); // this is untested
		});

		this.unblock();
		return future.wait();
	}
});