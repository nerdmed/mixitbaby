/*****************************************************************************/
/* Source: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Source.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

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
  this.isReady = new ReactiveVar(true);
};