define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap/dropdown' //attached to $
],
function($, _, Backbone){
  "use strict";

  var Navbar = Backbone.View.extend({
    el: $("#navbar")[0],
    events: {},
    initialize: function(){

    },
    render: function(){
      var _this = this;
      //_this.$el.find('#user-menu').dropdown();
    }
  });

  return Navbar;
});
