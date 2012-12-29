define([
  'underscore',
  'jquery',
  'backbone'
],
function(_, $, Backbone){
  'use strict';

  var _template_text = ['<input name="location[]" type="text" class="search-from" placeholder="Type in Location"/>',
                        '<button class="close">&times;</button>'].join(''),
      _view_counter = 0,

  TextInput = Backbone.View.extend({
    template: _.template(_template_text),
    className: 'location-input',
    events: {
      'click button.close': function(){
        var _this = this;

        _view_counter--;
        _this.remove();
        _this.trigger('remove');
      }
    },
    initialize: function(){
      _view_counter++;
    },
    show_close_icon: function(){
      var _this = this;

      if(_view_counter === 1){
        _this.$el.find('button.close').hide();
      } else {
        _this.$el.find('button.close').show();
      }
    },
    render: function(){
      var _this = this,
          $el   = _this.$el;

      $el.html(_this.template({}));
      _this.show_close_icon();
      return this;
    }
  });

  return TextInput;
});
