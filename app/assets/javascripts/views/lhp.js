define([
  'underscore',
  'jquery',
  'backbone',
  'views/text_input'
],
function(_, $, Backbone, TextInput){
  "use strict";

  var LHP = Backbone.View.extend({
    events: {
      'click div.add-destination': 'add_destination'
    },
    inputs: [],
    initialize: function(){
      var _this = this;


    },
    render: function(){
      var _this = this,
          input = new TextInput();

      _this.inputs.push(input); //TODO: Make it searchable & idexable, useless for now
      _this.$el.find('form').prepend(input.render().el);

      _this.$el.fadeIn();

      _this.$el.find('input').first().focus();
    },
    add_destination: function(){
      var _this = this,
          input = new TextInput();

      _this.inputs.push(input);

      _this.$el.find('form > div.location-input').last().after(input.render().el);


    }
  });

  return LHP;

});
