YUI.add('mqlite-map', function(Y){
	"use strict"; 
	
	/* global: L */
	
    var _map = Y.namespace('mqlite').$map = new L.Map('map');
     
    
    var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/61f3eb455a934d3f8613a7f32799edf3/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    });
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {  
            var pos = new L.LatLng(position.coords.latitude, position.coords.longitude); // geographical point (longitude and latitude)
            _map.setView(pos, 13).addLayer(cloudmade);
 
        }); 
    } 
    
});
