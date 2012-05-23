Y_Main.use(
'io-base',	
'autocomplete',
'autocomplete-highlighters',
'json-parse',
'mqlite-map',
'mqlite-navbar', 
'event-key', function(Y){
	
	"use strict";
	
	var _renderPOI = function(result){
		var bb = result.boundingbox, 
            southWest = new MQA.LatLng(bb[0],bb[2]),
            northEast = new MQA.LatLng(bb[1],bb[3]),
            bounds = new MQA.RectLL(southWest, northEast);
         
		map.zoomToRect(bounds);
	    
	    var shape = new MQA.Poi(new MQA.LatLng(result.lat, result.lon));
	    shape.setRolloverContent(result.display_name.split(',')[0]);
	    map.addShape(shape);
	};
	
	Y.one('input').plug(Y.Plugin.AutoComplete, {      
        resultHighlighter: 'phraseMatch',
        source: "/api/open_maps/autocomplete/{query}", 
        resultTextLocator: 'display_name',
        on: {
            select: function(event){
                var result = event.result.raw;
      			_renderPOI(result);	
            }
        }
    }).on('key', function(){
    	window.location = '/search/' + this.get('value'); 
    },'enter');
    
    Y.one('#lhp-content').delegate('click', function(){
    	_renderPOI(MQ_DATA.search[this.getAttribute("cnt")]);
    }, 'li'); 
    	
}); 
