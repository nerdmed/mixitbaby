Template.Source.helpers({
  isReady: function () {
    var instance = Template.instance();
    return instance.isReady.get();
  }
});

Template.Source.created = function () {
  this.isReady = new ReactiveVar(true);
};