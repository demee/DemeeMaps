!function($){
    "use strict"; 
    var _lc = {};
    var map = new L.Map('map');
    var _loaded; 
    
    var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/61f3eb455a934d3f8613a7f32799edf3/997/256/{z}/{x}/{y}.png', {
    //var cloudmade = new L.TileLayer('http://mtile01.mqcdn.com/tiles/1.0.0/vy/map/{z}/{x}/{y}.png', {
    
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    });
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {  
            var pos = new L.LatLng(position.coords.latitude, position.coords.longitude); // geographical point (longitude and latitude)
            map.setView(pos, 13).addLayer(cloudmade);
            _loaded = true;
        }); 
    } 
    
    //falback for browser without geolocation
    setTimeout(function(){
        if(_loaded) return; 
        var london = new L.LatLng(51.505, -0.09);
        map.setView(london, 13).addLayer(cloudmade);    
    }, 1000); 
    
    $("form").submit(function(){return false});
    
    YUI().use('autocomplete', 'autocomplete-highlighters', 'jsonp', 'jsonp-url', function (Y) {
        Y.one('body').addClass('yui3-skin-sam');
        Y.one('input.search-from').plug(Y.Plugin.AutoComplete, {      
            resultHighlighter: 'phraseMatch',
            source: function (query, callback) {
                var json_callback = "callback" + Date().getTime;
                 
                window[json_callback] = function(response){
                    callback(response);               
                }; 
                
                $.getScript("http://open.mapquestapi.com/nominatim/v1/search?json_callback=" + json_callback + "&format=json&q=" + query);        
            }, 
            resultTextLocator: 'display_name',
            on: {
                select: function(event){
                    var bb = event.result.raw.boundingbox, 
                        southWest = new L.LatLng(bb[0],bb[2]),
                        northEast = new L.LatLng(bb[1],bb[3]),
                        bounds = new L.LatLngBounds(southWest, northEast);
                     map.fitBounds(bounds);
                     
                    var markerLocation = new L.LatLng(event.result.raw.lat, event.result.raw.lon);
                    var marker = new L.Marker(markerLocation);
                    map.addLayer(marker);
                    
                    _lc.from = event.result.raw;
                }
            }
        }); 
        
        Y.one('input.search-to').plug(Y.Plugin.AutoComplete, {      
            resultHighlighter: 'phraseMatch',
            source: function (query, callback) {
                var json_callback = "callback" + Date().getTime;
                 
                window[json_callback] = function(response){
                    callback(response);               
                }; 
            
                $.getScript("http://open.mapquestapi.com/nominatim/v1/search?json_callback=" + json_callback + "&format=json&q=" + query);        
            }, 
            resultTextLocator: 'display_name',
            on: {
                select: function(event){
                    _lc.to = event.result.raw;   
                    
                    var markerLocation = new L.LatLng(_lc.to.lat, _lc.to.lon);
                    var marker = new L.Marker(markerLocation);
                    map.addLayer(marker);                                       
                    
                    window.renderAdvancedNarrative = function(result){
                        var latlongs = [], 
                            sp = result.route.shape.shapePoints, 
                            bb = result.route.boundingBox; 
                        
                        for(var i = 0; i < sp.length; i+=2){
                            latlongs.push(new L.LatLng(sp[i], sp[i+1]));
                        }

                        var polyline = new L.Polyline(latlongs, {color: 'green'}),
                        
                        southWest = new L.LatLng(bb.ul.lat,bb.ul.lng),
                        northEast = new L.LatLng(bb.lr.lat,bb.lr.lng),
                        bounds = new L.LatLngBounds(southWest, northEast);
                        
                        map.fitBounds(new L.LatLngBounds(latlongs));
                        map.addLayer(polyline);
                   }
                    
                   if(_lc.from){
                       $.getScript("http://open.mapquestapi.com/directions/v0/route?callback=renderAdvancedNarrative&format=json&routeType=shortest&timeType=1&" +
                              "enhancedNarrative=false&shapeFormat=raw&generalize=200&locale=en_GB" +
                              "&unit=m&from=" + _lc.from.lat + "," + _lc.from.lon + "&" +
                              "to=" + _lc.to.lat + "," + _lc.to.lon +"&drivingStyle=2&highwayEfficiency=21.0", function(response){                              
                       
                       });
                    }
                }
            }
        });    
    });
    
    $('li.link-directions').click(function(){
        $(this).addClass('active').siblings().removeClass('active'); 
         $('input.search-to').fadeIn('slow');
    });
    
    $('li.link-search').click(function(){
         $(this).addClass('active').siblings().removeClass('active'); 
         $('input.search-to').fadeOut('slow');
    });
    
    $('input').click(function(){$(this).select()});
    
}(window.jQuery);