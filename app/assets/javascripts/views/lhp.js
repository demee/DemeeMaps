define([
  'lib/underscore',
  'lib/jquery',
  'lib/backbone',
  'views/text_input'
],
function(_, $, Backbone, TextInput){
  "use strict";

  var LHP = Backbone.View.extend({
    el: $('#lhp')[0],
    events: {},
    initialize: function(){
      var _this = this;

      _this.inputs = []; //input array
      /* There is at leats one text input, lets create views for all of them */
      _this.$('input').each(function(index, el){
        var inpt = new TextInput(el);
        //_this.inputs.push(inpt);
      });

    },
    render: function(){
      var _this = this;
      _this.$el.fadeIn();
      _this.$el.find('input').first().focus()
    }
  });

  return LHP;

});
