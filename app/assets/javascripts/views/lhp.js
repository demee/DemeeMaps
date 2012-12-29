define([
  'underscore',
  'jquery',
  'backbone',
  'views/text_input',
  'jquery-form-serializer'
],
function(_, $, Backbone, TextInput){
  'use strict';

  var _proccessFormSubmit = function(){
    var _this = this,
        formData = _this.$el.find('form').serializeObject();

      if(formData.location.length == 1 && formData.location[0].length > 0) {
        _this.router.navigate(['/search/', formData.location].join(''),{trigger: true});
      } else if(formData.location.length > 1 &&
                formData.location[0].length > 0 &&
                formData.location[1].length > 0) {
        _this.router.navigate(['/directions/', formData.location.join(';')].join(''), {trigger: true});
      }
  };

  var LHP = Backbone.View.extend({
    events: {
      'click div.add-destination': function(event){
        var _this = this;
        _this.add_destination();
        _this.update_search_button_text();
      },
      'click button#main-search-button': function(){
        _proccessFormSubmit.call(this, arguments);
      },
      'click div#search-results ul > li': function(){

      },
      'keypress form': function(event){
        /* This code supose to prevent browser from fireing click event,
           on first button it can find inside the form */
        if(event.keyCode === 13) {
          _proccessFormSubmit.call(this, arguments);
          event.preventDefault();
          return false;
        }
      }
    },
    initialize: function(options, router){
      var _this = this;
      _this.router = router;

      router.on('route:search',     _.bind(_this.render_search_results,     _this));
      router.on('route:directions', _.bind(_this.render_directions_results, _this));
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
    },
    render_search_results: function(query, page){
      this.$el.find('#search-results').load(encodeURIComponent(query));
    },
    render_directions_results: function(query){
      this.$el.find('#search-results').load(encodeURIComponent(query));
    }
  });

  return LHP;

});
