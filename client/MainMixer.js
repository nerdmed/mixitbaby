
MainMixer = {
	playerDecks: [],
	isReady: new ReactiveVar(false),
	add : function(playerDeck){
		this.playerDecks.push(playerDeck);
		if(this.playerDecks.length > 1){
			MainMixer.isReady.set(true);
		}

	}

}

// // when the count changes
// Tracker.autorun(function(){
// 	var count = MainMixer.count.get();
// 	console.log(count);
// 	var isReady = MainMixer.playerDecks.length > 1;
// 	Tracker.autorun(function(comp){
// 		_.each(MainMixer.playerDecks, function(deck){
// 			isReady && deck.source.isReady.get();
// 		})
// 		comp.stop();
// 	})

// 	MainMixer.isReady.set(isReady);
// })