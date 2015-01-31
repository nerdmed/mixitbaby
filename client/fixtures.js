Playlists = new Mongo.Collection(null);

Playlists.insert({
	name: "default",
	songs: [{
		_id: "1",
		title: "Warm Thoughts",
		artist: "Flume",
		bpm: 85,
		duration: 228,
		data_url: "http://r11---sn-4g57knls.googlevideo.com/videoplayback?key=yt5&mime=audio%2…h-LcGs_Kgf185b5cwrfJbem1FpEeSvhdfO&mv=m&mt=1422716078&ms=au&ratebypass=yes",
		active: true
	}, {
		_id: "2",
		title: "untitled",
		artist: "ephmr",
		bpm: 157,
		duration: 208,
		data_url: "https://api.soundcloud.com/tracks/188278049/stream?client_id=b45b1aa10f1ac2941910a7f0d10f8e28",
		active: false
	}, {
		_id: "3",
		title: "Something",
		artist: "Someone",
		bpm: 70,
		duration: 190,
		active: false
	}]
});