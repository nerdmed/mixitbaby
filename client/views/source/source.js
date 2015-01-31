/*****************************************************************************/
/* Source: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Source.events({
  'drop .droptarget': function (e, tmpl) {
    var instance = Template.instance();
    e.preventDefault();
    var songId = e.originalEvent.dataTransfer.getData("text/song-id");
    instance.songId.set(songId);

  }
});

Template.Source.helpers({
  isReady: function () {
    var instance = Template.instance();
    return instance.isReady.get();
  }
});

/*****************************************************************************/
/* Source: Lifecycle Hooks */
/*****************************************************************************/
Template.Source.created = function () {
  var instance = this;
  instance.isReady = new ReactiveVar(false);
  instance.isLoading = new ReactiveVar(false);
  instance.songId = new ReactiveVar();


  instance.autorun(function(){
      var songId = instance.songId.get();
      console.log(songId);
      if(songId){
          var song = Songs.findOne(songId);
          if(song.data_url && song.title){
              instance.isReady.set(true);
          }
      }
  })


};

Template.Source.helpers({
  getSource: function () {
    return Template.instance();
  }
});


