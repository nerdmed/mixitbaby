Crossfader = function(obj) {
    this.audioContext = new AudioContext();

    this.updateTime = 100;

    this.playerDecks = obj.playerDecks;

    this.max = obj.max;
    this.min = obj.min;
    this.sliderValue = obj.sliderValue;

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

        self.sliderValue = value;
        console.log(self.sliderValue);

        var x = parseInt(self.sliderValue) / this.max;

        // Use an equal-power crossfading curve:
        var gain0value = Math.cos(x * 0.5 * Math.PI);
        var gain1value = Math.cos((1.0 - x) * 0.5 * Math.PI);

        this.gain0.gain.value = gain0value;
        this.gain1.gain.value = gain1value;

        console.log(this.gain0.gain.value, this.gain1.gain.value);
    },

    autoFade: function(direction) {
        var self = this;

        if (self.autofading){
            if (direction){
                self.autofading = false;
            }

        } else {
            if (direction) {
                self.autoFadeDirection = direction;
                self.autofading = true;
            }
        }
        self.fadeToEnd();
    },

    fadeToEnd: function() {

        var self = this;

        if (self.autoFadeDirection == "left") {
            self.sliderValue -= 1;
        }

        if (self.autoFadeDirection == "right") {
            self.sliderValue += 1;
        }

        self.calculateGains(self.sliderValue);
        self.setUIValue(self.sliderValue);

        console.log("self.sliderValue = ", self.sliderValue);

        // check if it's at the end
        // if (self.sliderValue != self.min && self.sliderValue != self.max) {
        if (self.sliderValue > self.min && self.sliderValue < self.max) {
            setTimeout(function() {
                self.autoFade();
            }, self.updateTime);
        } else {
            self.autofading = false;
        }
    },

    getUIValue: function(){
        return $('#slider').slider('value');
    },

    setUIValue: function(value) {
        $('#slider').slider('value', value);
    }
});