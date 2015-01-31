var saveSong = function (streamUrl, id) {
    Songs.update(id, {
        $set:{
            data_url: streamUrl
        }
    });
}

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

        instance.source.isLoading.set(true);
        console.log("LOADING")
        if (url.indexOf("youtube") > -1) {
            YouTube.lookup(url, saveSong);
        } else if (url.indexOf("soundcloud") > -1) {
            Soundcloud.lookup(url, saveSong);
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


Template.UrlInput.rendered = function () {
    var instance = this;

    // instance.autorun(function(){
    //     var url = instance.url.get();

    //     // Database Insert - on callback 


    //     if(instance.source) instance.source.isReady.set(true);

    // });
}

/*****************************************************************************/
/* UrlInput: Lifecycle Hooks */
/*****************************************************************************/
Template.UrlInput.created = function () {
  this.valid = new ReactiveVar();
  this.source = Template.currentData() || {};
  this.url =  new ReactiveVar();
  if(!this.source.isLoading) this.source.isLoading = new ReactiveVar(false);
};

function saveSong(err, stream_url, info) {
    var instance = Template.instance();
    instance.source.isLoading.set(false);
    if (err) return console.warn(err);
    instance.url.set(stream_url);
    instance.info = info;
    console.log(info.title, stream_url);
}



function urlCheck(input) {
    check(input, String);
    if (input.substring(0, 3) === "www") {
        input = "http://" + input;
    }
    var urlregex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

    return urlregex.test(input);
}