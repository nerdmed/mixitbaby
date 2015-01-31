Songs = new Mongo.Collection("songs")
Songs.insert({
    _id: "1",
    title: "Warm Thoughts",
    artist: "Flume",
    bpm: 85,
    duration: 228,
    data_url: "/escortflow.mp3",
    active: true
});
Songs.insert({
    _id: "2",
    title: "untitled",
    artist: "ephmr",
    bpm: 157,
    duration: 208,
    data_url: "/fergsomnia.mp3",
    active: false
});
Songs.insert({
    _id: "3",
    title: "Something",
    artist: "Someone",
    bpm: 70,
    duration: 190,
    active: false
});