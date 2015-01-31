Crossfader = function(obj) {
    this.audioContext = new AudioContext();

    this.playerDecks = obj.playerDecks;

    this.el = obj.el;

    this.source0 = this.audioContext.createMediaElementSource(this.playerDecks[0].audio);
    this.source1 = this.audioContext.createMediaElementSource(this.playerDecks[1].audio);

    this.gain0 = this.audioContext.createGain();
    this.gain1 = this.audioContext.createGain();

    this.gain0.gain.value = 0.5;
    this.gain1.gain.value = 0.5;

    this.source0.connect(this.gain0);
    this.source1.connect(this.gain1);

    this.gain0.connect(this.audioContext.destination);
    this.gain1.connect(this.audioContext.destination);
}

_.extend(Crossfader.prototype, {
    fade: function(value, max) {
        var x = parseInt(value) / parseInt(max);

        // Use an equal-power crossfading curve:
        var gain0value = Math.cos(x * 0.5 * Math.PI);
        var gain1value = Math.cos((1.0 - x) * 0.5 * Math.PI);

        this.gain0.gain.value = gain0value;
        this.gain1.gain.value = gain1value;

        // console.log(this.gain0.gain.value, this.gain1.gain.value);
    }
});