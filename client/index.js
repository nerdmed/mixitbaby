Template.body.events({
	'dragover .droptarget': function (e, tmpl) {
		e.preventDefault(); // allows us to drop on this element!
		return false;
	},
	'drop .jumbotron': function (e, tmpl) {
		console.log("something happened");
		console.log(e.originalEvent.dataTransfer.getData("text/song-id"));
		e.preventDefault();
		//e.stopPropagation(); // stops the browser from redirecting.
	}
});