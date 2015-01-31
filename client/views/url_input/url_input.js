/*****************************************************************************/
/* UrlInput: Event Handlers and Helpersss .js*/
/*****************************************************************************/

Template.UrlInput.events({
    'keyup .url input': function(e) {
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
    },
    'change .url input': function (e) {
        var instance = Template.instance();
        var elem = e.currentTarget;
        var url = elem.value;
        var isLoading = instance.source.isLoading;
        var type;

        if(url.length === 0) return isLoading.set(false);
        
        isLoading.set(true);

        if (url.indexOf("youtube") > -1) {
            type = "YouTube";
            YouTube.lookup(url, saveSong);
        } else if (url.indexOf("soundcloud") > -1) {
            type = "SoundCloud";
            Soundcloud.lookup(url, saveSong);
        }

        function saveSong(err, stream_url, info) {
            elem.value = "";
            instance.source.isLoading.set(false);
            if (err) return console.warn(err);
            instance.url = stream_url;
            instance.info = info;
            if(url){
                Songs.insert({
                    source_type: type,
                    cover: info.artwork_url,
                    title: info.title,
                    data_url: instance.url
                }, function(err, id){
                    if(instance.source.songId) instance.source.songId.set(id);
                    if(instance.source.isReady) instance.source.isReady.set(true);
                });
                console.log(info.title, stream_url);
            }

        }
    }
});

Template.UrlInput.helpers({
    isValid: function() {
        var instance = Template.instance();
        var valid = instance.valid.get();

        if (valid === false) return "not-valid";
        else if (valid === true) return "valid";
    },
    isLoading: function(){
        var instance = Template.instance();
        return instance.source.isLoading.get();
    }
});


/*****************************************************************************/
/* UrlInput: Lifecycle Hooks */
/*****************************************************************************/
Template.UrlInput.created = function () {
  this.valid = new ReactiveVar();
  this.source = Template.currentData() || {};
  if(!this.source.isLoading) this.source.isLoading = new ReactiveVar(false);
};





function urlCheck(input) {
    check(input, String);
    if (input.substring(0, 3) === "www") {
        input = "http://" + input;
    }
    var urlregex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

    return urlregex.test(input);
}