Template.Main.helpers({
  currentPlaylist: function () {
    var currentPlaylist = "default";
    return Songs.findOne({name: currentPlaylist})
  },
  decksReady: function(){
  	return MainMixer.isReady.get();
  },
  showList: function(){
  	return Songs.find().count() > 1;
  }
});