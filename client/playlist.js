Template.Playlist.events({
	'click #add-song': function (e, tmpl) {
		Playlists.update(this._id, {
			$addToSet: {
				songs: { // new Song()
					title: "untitled",
					artist: "unknown artist"
				}
			}
		});
	},
	'dragstart .list-group-item': function (e, tmpl) {
		e.originalEvent.dataTransfer.setData('text/song-id', this._id);
		e.originalEvent.dataTransfer.setData('text/plain', this.data_url);
	},
});
