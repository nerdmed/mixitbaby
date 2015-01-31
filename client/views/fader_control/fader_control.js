Template.fader_control.rendered = function(){
	crossfader = new Crossfader({
		el: $("input").get(0),
		playerDecks: MainMixer.playerDecks
	});
}


var dragging;

Template.fader_control.events({
	'mousedown input': function (e) {
		dragging = true;
		window.addEventListener('mousemove', fade, false);
	},
    'mouseup input': function (e) {
    	dragging = false;
    	window.removeEventListener('mousemove', fade, false);
    }
});

function fade (e) {
	if (!dragging) return;
	crossfader.fade(e.currentTarget);
}