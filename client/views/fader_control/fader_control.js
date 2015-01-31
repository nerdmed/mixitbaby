Template.fader_control.rendered = function(){
	$( "#slider" ).slider({
		min:0,
		max: 100,
		value: 50,
		change: function( event, ui ) {
			crossfader.fade(ui.value, 100);
		},
		slide: function( event, ui ) {
			crossfader.fade(ui.value, 100);
		}
	});
	
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
    	fade(e);
    	dragging = false;
    	window.removeEventListener('mousemove', fade, false);
    },
    'click #fadeLeft': function(e) {
    	crossfader.autoFade(0);
    },
    'click #fadeRight': function(e) {
    	crossfader.autoFade(1);
    },
});

function fade(e) {
	if (!dragging) return;
	crossfader.fade(e.currentTarget);
}