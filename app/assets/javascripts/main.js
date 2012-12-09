require.config({
  shim: {
    'lib/bootstrap': {
      deps: ['lib/jquery'] //FIXME: sometimes jquery is not loaded before bootstrap causing it to fail
    },
    'lib/backbone': {
      //These script dependencies should be loaded before loading
      //backbone.js
      deps: ['lib/underscore', 'lib/jquery']
    }
  }
});


require(['views/map', 'views/navbar', 'views/lhp', 'lib/jquery'], function(Map, Navbar, Lhp){
  "use strict";

  var map = new Map(),
      navbar = new Navbar(),
      lhp = new Lhp();

  map.render();
  navbar.render();
  lhp.render();
});

/*



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
		_renderPOI = function(point){
			var bb = point.boundingbox,
	            southWest = new MQA.LatLng(bb[0],bb[2]),
	            northEast = new MQA.LatLng(bb[1],bb[3]),
	            bounds = new MQA.RectLL(southWest, northEast);

			map.zoomToRect(bounds);

		    var shape = new MQA.Poi(new MQA.LatLng(point.lat, point.lon));
		    shape.setRolloverContent(point.display_name.split(',')[0]);
		    map.addShape(shape);
		};


	Y.one('#lhp-content').delegate('key', function(){
    	_app.navigate( '/search/' + this.get('value'));
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

});
*/
