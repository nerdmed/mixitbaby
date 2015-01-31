Template.fader_control.rendered = function(){
	var playerDeckList = $(".PlayerDeck").get();
	crossfader = new Crossfader({
		playerDeckList: playerDeckList
	});
}


Template.fader_control.events({
    'change input': function(e) {
        crossfader.fade(e.currentTarget);
    }
});