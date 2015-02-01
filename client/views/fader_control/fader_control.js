Template.fader_control.rendered = function(){
	$( "#slider" ).slider({
		min:0,
		max: 100,
		value: 50,
		change: function( event, ui ) {
			crossfader.calculateGains(ui.value, 100);
		},
		slide: function( event, ui ) {
			crossfader.calculateGains(ui.value, 100);
		}
	});
	
	crossfader = new Crossfader({
		sliderValue: 50,
		max: 100,
		min: 0,
		playerDecks: MainMixer.playerDecks
	});
}


Template.fader_control.events({
    'click #fadeLeft': function(e) {
    	crossfader.autoFade("left");
    },
    'click #fadeRight': function(e) {
    	crossfader.autoFade("right");
    },
});


// var dragging;

// Template.fader_control.events({
// 	'mousedown input': function (e) {
// 		crossfader.autofade = false;
// 		dragging = true;
// 		window.addEventListener('mousemove', fade, false);
// 	},
//     'mouseup input': function (e) {
//     	fade(e);
//     	crossfader.autofade = false;
//     	dragging = false;
//     	window.removeEventListener('mousemove', fade, false);
//     },
//     'click #fadeLeft': function(e) {
//     	crossfader.autoFade(0);
//     },
//     'click #fadeRight': function(e) {
//     	crossfader.autoFade(1);
//     },
// });

// function fade(e) {
// 	if (!dragging) return;
// 	crossfader.calculateGains(parseInte.currentTarget);
// }