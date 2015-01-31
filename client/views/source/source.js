Template.Source.helpers({
  isReady: function () {
    var instance = Template.instance();
    return instance.isReady.get();
  }
});

/*****************************************************************************/
/* Source: Lifecycle Hooks */
/*****************************************************************************/
Template.Source.created = function () {
  this.isReady = new ReactiveVar(false);
  this.isLoading = new ReactiveVar(false);
};

Template.Source.helpers({
  getSource: function () {
    return Template.instance();
  }
});


