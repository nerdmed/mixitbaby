Playlists = new Mongo.Collection(null);

Playlists.insert({
	name: "default",
	songs: [1,2,3]
});

//Playlists.publishComposite("playlists", function (id) {
//	return {
//		find: function () {
//			return Playlists.find(id);
//		},
//		children: {
//			find: function (playlist) {
//				return Songs.find({_id: {$in: playlist.songs}});
//			}
//		}
//	}
//})
