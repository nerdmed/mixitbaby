Template.body.events({
	'dragover .droptarget': function (e, tmpl) {
		e.preventDefault(); // allows us to drop on this element!
		return false;
	},
	'drop .droptarget': function (e, tmpl) {
		console.log(e.originalEvent.dataTransfer.getData("text/song-id"));
		e.preventDefault();
	}
});