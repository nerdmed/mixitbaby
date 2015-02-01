var sliderMax = 100;
var sliderMin = 0;
var sliderInit = 50;

Template.fader_control.rendered = function() {
    $("#slider").slider({
        min: sliderMin,
        max: sliderMax,
        value: sliderInit,
        change: function(event, ui) {
            crossfader.calculateGains(ui.value);
        },
        slide: function(event, ui) {
            crossfader.calculateGains(ui.value);
        }
    });

    crossfader = new Crossfader({
        sliderValue: sliderInit,
        max: sliderMax,
        min: sliderMin,
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