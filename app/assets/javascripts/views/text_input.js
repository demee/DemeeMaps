define([
  'lib/underscore',
  'lib/jquery',
  'lib/backbone'
],
function(_, $, Backbone){
  "use strict";

  var _input_template = '<input name="location" type="text" class="search-from" placeholder="Type in Location"/>';

  var TextInput = Backbone.View.extend({
    tagName: 'input',
    el: $('input').get(0),
    events: {

    },
    template: _.template(_input_template),
    initialize: function(el){
      var _this = this;

      if(!el){
        throw new Error("el is not defined")
      }

      //_this.setElement(el)

    },
    render: function(){

    }
  });

  return TextInput;
});
