Router.route('/', function () {
  this.render('Player', {
    data: function () {
    	var currentPlaylist = "default"; // to be set via route etc later
    	return {
    		currentPlaylist: Playlists.findOne({name: currentPlaylist})
    	}
    }
  });
});