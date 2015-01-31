/*****************************************************************************/
/* PlayerDeck: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.PlayerDeck.events({
    'click .play-pause ': function(e, tpl) {
        tpl.deck.playing.get() ? tpl.deck.pause() : tpl.deck.play();
    }
});

Template.PlayerDeck.helpers({
    playing: function() {
        var instance = Template.instance();
        var playing = instance.deck.playing.get();
        if (playing === true) return "playing";
        else if (playing === false) return "paused";
    },
    playingClass: function() {
        var instance = Template.instance();
        var playing = instance.deck.playing.get();
        if (playing === false) return "glyphicon-play";
        else if (playing === true) return "glyphicon-pause";
    },
    getCover: function(){
        var instance = Template.instance();
        var song = Songs.findOne(instance.songId.get());
        return song.cover || "/catCover.jpg";

    }

});

/*****************************************************************************/
/* PlayerDeck: Lifecycle Hooks */
/*****************************************************************************/
Template.PlayerDeck.created = function() {
    var instance = this;
    instance.deck = new PlayerDeck();
    instance.source = Template.currentData();
    instance.songId = instance.source.songId;

    instance.autorun(function(){
        var songId = instance.songId.get();
        console.log(songId);
        if(songId){
            var song = Songs.findOne(songId);
            if(song.data_url && song.title){
                instance.player.audio.src = song.data_url;
            }
        }
    })
};

Template.PlayerDeck.helpers({
    getSongData: function () {
        var instance = Template.instance();
        return Songs.findOne(instance.songId.get());
    }
});

/*****************************************************************************/
/* PlayerDeck: Object */
/*****************************************************************************/
function PlayerDeck(obj) {
    this.audio =  new Audio();
    this.loading = new ReactiveVar();
    this.source = new ReactiveVar();
    this.playing = new ReactiveVar(false);
    MainMixer.playerDecks.push(this);
}

_.extend(PlayerDeck.prototype, {
    play: function() {
        this.audio.play();
        this.playing.set(true);
    },
    pause: function() {
        this.audio.pause();
        this.playing.set(false);
    },
    addQPoint: function() {

    }
});