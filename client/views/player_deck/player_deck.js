var currentTrack = new ReactiveVar(0);
var playlist = Playlists.findOne();

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
    currentSong: function () {
        return Songs.findOne(playlist.songs[currentTrack.get()]);
    },
    nextSong: function (){
        return Songs.findOne(playlist.songs[currentTrack.get()+1]);
    }

});

/*****************************************************************************/
/* PlayerDeck: Lifecycle Hooks */
/*****************************************************************************/
Template.PlayerDeck.created = function() {
    this.deck = new PlayerDeck();
};


Template.PlayerDeck.rendered = function () {
    var player = $("#player")[0];
    this.autorun(function () {
        //player.pause();
        //$(player).attr("src", Songs.findOne(playlist.songs[currentTrack.get()])).url;
        //player.play();

    });
    $("#player").on('ended', function () {
        var ct = currentTrack.get();
        ct++;
        currentTrack.set(ct);
    });
};

/*****************************************************************************/
/* PlayerDeck: Object */
/*****************************************************************************/
function PlayerDeck(obj) {
    var obj = obj || {};
    this.songId = new ReactiveVar();
    this.audio = obj.audio || new Audio("/music.mp3");
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