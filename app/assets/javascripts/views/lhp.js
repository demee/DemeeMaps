define([
  'lib/underscore',
  'lib/jquery',
  'lib/backbone'
],
function(_, $, Backbone){
  "use strict";

  var LHP = Backbone.View.extend({
    el: $('#lhp')[0],
    events: {},
    initialize: function(){},
    render: function(){
      var _this = this;
      _this.$el.fadeIn();
      _this.$el.find('input').first().focus()
    }
  });

  return LHP;

});
