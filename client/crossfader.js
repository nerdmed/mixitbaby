Crossfader = function(obj) {
    this.audioContext = new AudioContext();

    this.updateTime = 100;

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

        console.log(this.gain0.gain.value, this.gain1.gain.value);
    },

    autoFade: function(direction) {
        // direction = 0: left
        // drection = 1: right

        var self = this;

        if (direction === 0) {
            self.el.value -= 1;
        } 

        if (direction === 1) {
            self.el.value = self.el.value * 1 + 1;
        }

        self.el.value = Math.max(self.el.value, self.el.min);
        self.el.value = Math.min(self.el.value, self.el.max);

        if (self.el.value != self.el.min && self.el.value != self.el.max) {
            setTimeout(function() {
                self.autoFade(direction);
            }, self.updateTime);
        }
    }
});
