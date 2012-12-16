define([
  'underscore',
  'jquery',
  'backbone'
],
function(_, $, Backbone){
  "use strict";

  var _template_text = ['<input name="location" type="text" class="search-from" placeholder="Type in Location"/>',
                   '<button class="close">&times;</button>'].join(''),

  TextInput = Backbone.View.extend({
    template: _.template(_template_text),
    className: 'location-input',
    render: function(){
      var _this = this,
          $el   = _this.$el;

      $el.html(_this.template({}));
      return this;
    }
  });

  return TextInput;
});
