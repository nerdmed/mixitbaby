Template.fader_control.rendered = function(){
	$( "#slider" ).slider({
		min:0,
		max: 100,
		change: function( event, ui ) {
			crossfader.fade(ui.value, 100);
		}
	});
	
	crossfader = new Crossfader({
		el: $("input").get(0),
		playerDecks: MainMixer.playerDecks
	});
}
