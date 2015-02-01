Crossfader = function(obj) {
    this.audioContext = new AudioContext();

    this.updateTime = 100;

    this.playerDecks = obj.playerDecks;

    this.max = obj.max;
    this.min = obj.min;

    this.autofading = false;

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
    calculateGains: function(value) {
        var x = parseInt(value) / this.max;

        // Use an equal-power crossfading curve:
        var gain0value = Math.cos(x * 0.5 * Math.PI);
        var gain1value = Math.cos((1.0 - x) * 0.5 * Math.PI);

        this.gain0.gain.value = gain0value;
        this.gain1.gain.value = gain1value;
    },

    autoFade: function(newDirection) {
        var self = this;

        if (self.autofading) {
            if (newDirection) {
                self.autofading = false;
            }

        } else {
            if (newDirection) {
                self.autoFadeDirection = newDirection;
                self.autofading = true;
            }
        }
        self.fadeToDirection();
    },

    fadeToDirection: function() {

        var self = this;

        if (self.autofading) {
            if (self.autoFadeDirection == "left") {
                self.setUIValue(self.getUIValue() - 1);
            }

            if (self.autoFadeDirection == "right") {
                self.setUIValue(self.getUIValue() + 1);
            }

            self.calculateGains(self.getUIValue());
            self.setUIValue(self.getUIValue());

            self.setUIValue(Math.min(self.getUIValue(), self.max));
            self.setUIValue(Math.max(self.getUIValue(), self.min));

            // check if it's at the end
            if (self.getUIValue() > self.min && self.getUIValue() < self.max) {
                setTimeout(function() {
                    self.autoFade();
                }, self.updateTime);
            } else {
                self.autofading = false;
            }
        }
    },

    getUIValue: function() {
        return $('#slider').slider('value');
    },

    setUIValue: function(value) {
        $('#slider').slider('value', value);
    }
});