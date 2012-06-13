Y_Main.use(
'io-base',	
'autocomplete',
'autocomplete-highlighters',
'json-parse',
'mqlite-map',
'mqlite-navbar', 
'event-key', 
function(Y){
	
	"use strict";
	
	var _app = Y_Main.namespace('mqlite').$mqliteApp, 
	_coll = new MQA.ShapeCollection(),
		/**
		 * render poi based on open data response 
		 */
	    
		_renderPOI = function(point){
			var bb = point.boundingbox, 
	            southWest = new MQA.LatLng(bb[0],bb[2]),
	            northEast = new MQA.LatLng(bb[1],bb[3]),
	            bounds = new MQA.RectLL(southWest, northEast);
	         
			map.zoomToRect(bounds);
		    
		    var shape = new MQA.Poi(new MQA.LatLng(point.lat, point.lon));
		    shape.setRolloverContent(point.display_name.split(',')[0]);
		    var detail = {name: point.display_name, id: point.place_id, lat:point.lat, lon:point.lon};
		    var escaped = escape(JSON.stringify(detail));
		    
		    
		    
		    var content = "<div class=\"poi_detail\">" + point.display_name +
		    			  "<button class=\"button add_to_itinerary\" onclick=\"javascript:hackAddToItinerary('" + escaped +"');\">Add to Itinerary</button>" +
		    		      "</div>";
		    shape.setInfoContentHTML(content);

		      //HACK: adding to shapecollection obj first. Can't seem to retieve shapes properly when added directly to map?		    
		    var coll = new MQA.ShapeCollection();
		    coll.add(shape);
		    coll.setName("searchResultsCollection");
		    map.addShapeCollection(coll);		    
	
		},
		
		_renderCollectionPOI = function(point){
			 
		    var shape = new MQA.Poi(new MQA.LatLng(point.lat, point.lon));
		    var icon = new MQA.Icon("http://mq-devhost-lm41.ihost.aol.com:8800/cdn/dotcom3/images/icons/collection/v2/7.png", 30, 30);
		    shape.setRolloverContent("<div class=\"poi_detail\">" + point.name + "</div>"); 
		    shape.setIcon(icon);
		    shape.setKey(point.id);
		    
		    _coll.add(shape);
		    
		}
		
		
	/*
	 * Event handlers ----------------------------------------
	 */	
	Y.one('#lhp-content').delegate('key', function(){
    	
		//_app.navigate( '/search/' + this.get('value'));
		
		var path = { path: '/search/' + this.get('value')}
		_app.handleSearch(path);
		
    	_app.set('activeInput', this); 
    },'enter', 'input');
    
    Y.one('#lhp-content').delegate('click', function(){
        var place_id = this.get('id').replace('place_id_', ''), 
            poi = _app.getSearchByPlaceId(place_id); 
    	
    	_app.get('activeInput').set('value', poi.display_name);
    	_app.get('directions').push(poi); //FIXME 
    	_renderPOI(poi);
    }, 'li');

    Y.one('button#get-directions').on('click', function(){
        var pois = _app.get('directions'), 
            query = "", i=0, poi; 
            
        while(poi = pois[i++]){
            query += [poi.display_name.split(',')[0], ',', poi.lat, ',', poi.lon, ';'].join('');
        } 
            
        _app.navigate('/directions/' + query);
    });
    
    if(_app.get('search')){
   		_renderPOI(MQ_DATA.search[0]);
	
    }
    
    _coll.setName("itinerary");
    map.addShapeCollection(_coll);
    
    if(MQ_DATA.collections){
    	
    	var collections = MQ_DATA.collections[0].pois; 
    	for(var i=0; i < collections.length; i++){

    		_renderCollectionPOI(collections[i]);
    		drawOnCollabPanel(collections[i]);
    	}
    	
    	 Y.navbar.showCollabPanel(); //focus on collaborate menu.	
     	
	}
    
    
    //#pusher is a global var defined in application.html.erb    
	var channel = pusher.subscribe('save_channel');
	channel.bind('save_event', function(data) {
		    _renderCollectionPOI(data);
			drawOnCollabPanel(data);
			
			//HACK: urgh.....
			var coll = map.getShapeCollection("searchResultsCollection");
			if(coll){
				coll.removeAll();		
			}
			
			
			
			Y_Main.navbar.reCalculateCollabPanelSize();
			rezoomMapToItineraryList();
			
			
	});
	
	var delete_channel = pusher.subscribe('delete_channel');
	   delete_channel.bind('delete_event', function(data) {
		
		   removeFromItinerary(data.id);
			   
	});
    
    
    	
}); 


function rezoomMapToItineraryList(){
	
	var bb =  map.getShapeCollection("itinerary").getBoundingRect();			
	map.zoomToRect(bb);
}

function removeFromItinerary(id){
	
	
	$("li#itin_" + id).remove()
	
	var itinerary_pois =  map.getShapeCollection("itinerary");
	var items  = itinerary_pois.items
	for(i = 0; i < items.length; i++){
	 
	      if(items[i].key == id){	         
	         itinerary_pois.remove(i);
	      }
	}
	
	Y_Main.navbar.reCalculateCollabPanelSize();
	rezoomMapToItineraryList();
	
}


function drawOnCollabPanel(obj){
	
	var deleteDiv = $("<div class=\"delete\">delete</div>");
	deleteDiv.click( function(e){ 
		
		handleCollections('delete', "{\"id\" : \"" + obj.id + "\"}"); //remove from mongo.
		
	});
	
	var li = $("<li>" + obj.name + "</li>");	
	li.attr("id", "itin_" + obj.id);
	li.append(deleteDiv);
	
	$("#itinerary ul").append(li);

}

function hackAddToItinerary(escapedObject, skipPersist){
	
	var _app = Y_Main.namespace('mqlite').$mqliteApp, 
	obj = JSON.parse(unescape(escapedObject));
	
	
	
	var data = {
	
	 poi: {
		id: obj.id,
		name: obj.name,
		lon: obj.lon,
		lat: obj.lat
	 }
	}
	

	//focus on collaborate menu.
    Y_Main.navbar.showCollabPanel();	

	if(!skipPersist){ //don't need to persist if this is called as a result of a push-message.
		handleCollections('save', JSON.stringify(data)); //remove from mongo.
	}

}


function handleCollections(action, data) {

	var cfg = {
		method : 'POST',
		data : data,
		headers: {
	        'Content-Type': 'application/json',
	    },
		on : {
			success : function(transactionid, response, arguments) {
				// do something here ??
				console.log(response);
			}
		}
	};

	var request = Y_Main.io("/api/collections/" + action, cfg);
}



	
	
	
    

