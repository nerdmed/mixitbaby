/*****************************************************************************/
/* UrlInput: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.UrlInput.events({
 'keyup .url input, change .url input': function(e) {
     var instance = Template.instance();
     var elem = e.currentTarget;
     var url = elem.value;
     var isValid;
     if (url.indexOf("youtube") > 0 || url.indexOf("soundcloud") > 0) {
         isValid = urlCheck(url);
     } else {
         isValid = false;
     }

     instance.valid.set(isValid);
 }
});

Template.UrlInput.helpers({
    isValid: function() {
        var instance = Template.instance();
        var valid = instance.valid.get();

        if (valid === false) return "not-valid";
        else if (valid === true) return "valid";
    }
});

/*****************************************************************************/
/* UrlInput: Lifecycle Hooks */
/*****************************************************************************/
Template.UrlInput.created = function () {
  this.valid = new ReactiveVar();
};


function urlCheck(input) {
    check(input, String);
    if (input.substring(0, 3) === "www") {
        input = "http://" + input;
    }
    var urlregex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

    return urlregex.test(input);
}