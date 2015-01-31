Template.Playlist.events({
	'dragstart .list-group-item': function (e, tmpl) {
		e.originalEvent.dataTransfer.setData('text/song-id', this._id);
		e.originalEvent.dataTransfer.setData('text/plain', this.data_url);
	},
});



Template.Playlist_Song.events({
	'change #data_url': function (e, tmpl) {
		var url = $(e.currentTarget).val();
		YouTube.lookup(url, function (err, url, res) {
			if (err) return console.warn(err);
			console.log(res.info.title, url);
		});
	}
});

Template.Playlist.helpers({
	songs: function () {
		return Songs.find();
	}
});