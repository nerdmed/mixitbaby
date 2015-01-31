var cuepoints = new Array(10);

doCuePoint = function (cuepoint, e) {
	cuepoint = cuepoint - 1;
	var deck = cuepoint > 5 ? 1 : 0;
	deck = MainMixer.playerDecks[deck];
	
	// Play or set cuepoint
	if (cuepoints[cuepoint] !== undefined) {
	    deck.audio.currentTime = cuepoints[cuepoint];
	    if (deck.audio.paused) deck.play();
	} else { // set cuepoint
	    cuepoints[cuepoint] = deck.audio.currentTime;
	}
}


hotkeys = new Hotkeys({
	autoLoad : true
});

hotkeys.add({
	combo: "1",
	callback: _.partial(doCuePoint, 1)
}, "keydown");

hotkeys.add({
	combo: "2",
	callback: _.partial(doCuePoint, 2)
}, "keydown");

hotkeys.add({
	combo: "3",
	callback: _.partial(doCuePoint, 3)
}, "keydown");

hotkeys.add({
	combo: "4",
	callback: _.partial(doCuePoint, 4)
}, "keydown");

hotkeys.add({
	combo: "5",
	callback: _.partial(doCuePoint, 5)
}, "keydown");

hotkeys.add({
	combo: "6",
	callback: _.partial(doCuePoint, 6)
}, "keydown");

hotkeys.add({
	combo: "7",
	callback: _.partial(doCuePoint, 7)
}, "keydown");

hotkeys.add({
	combo: "8",
	callback: _.partial(doCuePoint, 8)
}, "keydown");

hotkeys.add({
	combo: "9",
	callback: _.partial(doCuePoint, 9)
}, "keydown");

hotkeys.add({
	combo: "10",
	callback: _.partial(doCuePoint, 10)
}, "keydown");
