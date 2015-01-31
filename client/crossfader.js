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
        var self = this;

        if (direction && this.autofading){
            this.autofading = false;
            return;
        }

        this.autofading = true;

        // change direction if there is a new one
        if(direction){
            this.autoFadeDirection = direction
        }

        if (this.autoFadeDirection === 0) {  
            self.el.value -= 1;
        } 

        if (this.autoFadeDirection === 1) {
            self.el.value = self.el.value * 1 + 1;
        }

        var tempVal = self.el.value;
        self.el.value = Math.max(tempVal, self.el.min);
        
        tempVal = self.el.value;
        self.el.value = Math.min(tempVal, self.el.max);

        self.fade();

        tempVal = self.el.value;
        if (tempVal != self.el.min && tempVal != self.el.max) {
            setTimeout(function() {
                self.autoFade();
            }, self.updateTime);
        } else {
            this.autofading = false;
        }
    }
});