/*****************************************************************************/
/* PlayerDeck: Event Handlers and Helpersss .js*/
/*****************************************************************************/

Template.PlayerDeck.events({
    'mousedown .cue': function (e, tmpl) {
        return doCuePoint(e.currentTarget.dataset.cuepoint);
    },
    'click .waveform': function (e, tmpl) {
        var deck = Template.instance().deck;
        var time = e.offsetX / parseInt(getComputedStyle($(".PlayerDeck .waveform").get(0)).width) * deck.duration;
        deck.audio.currentTime = time;
    },
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
                instance.deck.audio.src = song.data_url;
            }
        }
    })
};

Template.PlayerDeck.helpers({
    getSongData: function () {
        var instance = Template.instance();
        var song = Songs.findOne(instance.songId.get());
        song.deckId = MainMixer.playerDecks.indexOf(instance.deck);
        return song;
    }
});

Template.PlayerDeck.rendered = function () {
    var progress = this.$(".PlayerDeck .waveform .progress").get(0);
    var deck = this.deck;

    $(deck.audio).on('canplay', function (e) {
        // so we don't have to keep reading from the DOM:
        deck.duration = this.duration;
    }).on('timeupdate', function (e) {
        progress.style.width = (this.currentTime / this.duration * 100) + "%";
    });
};

Template.PlayerDeck.destroyed = function () {
    $(this.deck.audio).off(); // remove all event listeners
};


/*****************************************************************************/
/* PlayerDeck: Object */
/*****************************************************************************/
function PlayerDeck(obj) {
    this.audio = new Audio();
    this.loading = new ReactiveVar();
    this.source = new ReactiveVar();
    this.playing = new ReactiveVar(false);
    MainMixer.add(this);
}

_.extend(PlayerDeck.prototype, {
    play: function() {
        this.audio.play();
        this.playing.set(true);
    },
    pause: function() {
        this.audio.pause();
        this.playing.set(false);
    }
});