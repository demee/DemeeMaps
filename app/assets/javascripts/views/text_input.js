define([
  'underscore',
  'jquery',
  'backbone'
],
function(_, $, Backbone){
  "use strict";

  var

  //<input name="location" type="text" class="search-from" placeholder="Type in Location"/>

  TextInput = Backbone.View.extend({
    tagName: 'input',
    render: function(){
      var $el = this.$el;

      $el.addClass('search-from');
      $el.attr('name', 'location');
      $el.attr('type', 'text');
      $el.attr('placeholder', 'Type in Location');

      return this;
    }
  });

  return TextInput;
});
