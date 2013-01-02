define([
  'underscore',
  'jquery',
  'backbone',
  'leaflet'
],
function(_, $, Backbone, L){
  "use strict";

  var Map = Backbone.View.extend({
    events: {

    },
    initialize: function(){
      var _this = this,
      _adjust_map_size = function adjust_map_size(){
        _this.$el.css('height', $(window).outerHeight() - $('.navbar').outerHeight());
      };
      $(window).resize(_adjust_map_size);
      _adjust_map_size();
    },
    render: function(){
      var _this = this;

      _this.map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
      });

      _this.map.zoomControl.setPosition('topright');

      var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/61f3eb455a934d3f8613a7f32799edf3/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
      });


      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new L.LatLng(position.coords.latitude, position.coords.longitude); // geographical point (longitude and latitude)
            _this.map.setView(pos, 13).addLayer(cloudmade);

        });
      }
    }
  });

  return Map;
});
