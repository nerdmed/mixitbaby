UI.registerHelper('class', function (name) {
	return !!this[name] ? name : '';
})