Template.Main.helpers({
  currentPlaylist: function () {
    var currentPlaylist = "default";
    return Songs.findOne({name: currentPlaylist})
  }
});