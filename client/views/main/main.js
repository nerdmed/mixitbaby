Template.Main.helpers({
  currentPlaylist: function () {
    var currentPlaylist = "default";
    return Playlists.findOne({name: currentPlaylist})
  }
});