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
      'click div.add-destination': function(){
        var _this = this;
        _this.add_destination();
        _this.update_search_button_text();
      }
    },
    render: function(){
      var _this = this,
          input = new TextInput();


      _this.$el.find('form').prepend(input.render().el);



      _this.$el.fadeIn();
      _this.$el.find('input').first().focus();

    },
    add_destination: function(){
      var _this = this,
          input = new TextInput();

      _this.$el.find('form > div.location-input').last().after(input.render().el);

      input.on('remove', _this.update_search_button_text, _this);
    },
    update_search_button_text: function(){
      var _this = this,
          $el = _this.$el,
          main_search_button = $el.find('button#main-search-button');

      if($el.find('input').length > 1){
        main_search_button.text('Get Directions');
      } else {
        main_search_button.text('Get Map');
      }
    }
  });

  return LHP;

});
