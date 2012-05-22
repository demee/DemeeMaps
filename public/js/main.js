Y_Main.use(
'io-base',	
'autocomplete',
'autocomplete-highlighters',
'json-parse',
'mqlite-map',
'mqlite-navbar',
 
function (Y) {
	"use strict";
	var _lc = {}, 
		_map = Y.namespace('mqlite').$map;
	  
    Y.one('input.search-from').plug(Y.Plugin.AutoComplete, {      
        resultHighlighter: 'phraseMatch',
        source: "/api/open_maps/autocomplete/{query}", 
        resultTextLocator: 'display_name',
        on: {
            select: function(event){
                var bb = event.result.raw.boundingbox, 
                    southWest = new L.LatLng(bb[0],bb[2]),
                    northEast = new L.LatLng(bb[1],bb[3]),
                    bounds = new L.LatLngBounds(southWest, northEast);
                 _map.fitBounds(bounds);
                 
                var markerLocation = new L.LatLng(event.result.raw.lat, event.result.raw.lon);
                var marker = new L.Marker(markerLocation);
                _map.addLayer(marker);
                
                _lc.from = event.result.raw;
            }
        }
    }); 
    
    Y.one('input.search-to').plug(Y.Plugin.AutoComplete, {      
        resultHighlighter: 'phraseMatch',
        source: "/api/open_maps/autocomplete/{query}", 
        resultTextLocator: 'display_name',
        on: {
            select: function(event){
                _lc.to = event.result.raw;   
                
                var markerLocation = new L.LatLng(_lc.to.lat, _lc.to.lon);
                var marker = new L.Marker(markerLocation);
                _map.addLayer(marker);
                
               	if(_lc.from){
                	Y.io(["/api/open_maps/route/", escape(_lc.from.lat), "/", _lc.from.lon, "/", _lc.to.lat,  "/", _lc.to.lon].join(''), {
                		on: { 
                			success: function(id, r){
		                        var latlongs = [], 
		                        	result = Y.JSON.parse(r.responseText),
		                            sp = result.route.shape.shapePoints, 
		                            bb = result.route.boundingBox; 
		                        
		                        for(var i = 0; i < sp.length; i+=2){
		                            latlongs.push(new L.LatLng(sp[i], sp[i+1]));
		                        }
		
		                        var polyline = new L.Polyline(latlongs, {color: 'green'}),
		                        
		                        southWest = new L.LatLng(bb.ul.lat,bb.ul.lng),
		                        northEast = new L.LatLng(bb.lr.lat,bb.lr.lng),
		                        bounds = new L.LatLngBounds(southWest, northEast);
		                        
		                        _map.fitBounds(new L.LatLngBounds(latlongs));
		                        _map.addLayer(polyline);
		                   }
		                }
              	 	});
                }
            }
        }
    });    
});
    