Y_Main.use('app', 'handlebars', function(Y){	
	var _compileTemplate = Y.Handlebars.compile, 
		_templates = {
		searchResults: _compileTemplate(['<ul>',
                                             '{{#each results}}',
                                                 '<li id="place_id_{{place_id}}">',
                                                      '{{display_name}}',
                                                 '</li>',
                                             '{{/each}}',
                                             '</ul>'].join('')),
                                              
        directionsResults: _compileTemplate(['<ul>',
                                                '{{#each legs}}',
                                                    '{{#each maneuvers}}',
                                                        '<li>',
                                                            '{{narrative}}',
                                                        '</li>',
                                                    '{{/each}}', 
                                                '{{/each}}',
                                             '</ul>'].join('')) 
		
	};
	
	Y.MQLiteApp = Y.Base.create('MQLiteApp', Y.App, [], {
	    views: {
	    	index: {},
	        search: {}
	    },
	    hendleIndex: function (req) {
	        
	    },	
	    handleSearch: function (req) {
	    	 var request = Y.io("/api/open_maps" + req.path, {
	    	 	on: {
	    	 		success: function(transactionid, response, arguments){
	    	 		    _app.set('search', Y.JSON.parse(response.responseText));
	    	 			var html = _templates.searchResults({ 
	    	 			    results: _app.get('search')
	    	 			});
	    	 			
	    	 			Y.one("#search-results").setHTML(html);
	    	 		}
	    	 	}
	    	 });	    	
	    }, 
	    handleDirections: function(req) {
	        var request = Y_Main.io("/api/open_maps" + req.path, {
	            on: {
	                success: function(transactionid, response, arguments){
	                    _app.set('route', Y_Main.JSON.parse(response.responseText)); 
	                    var html = _templates.directionsResults({
	                        legs: _app.get('route')['route']['legs']
	                    }); 
	                    
	                    Y.one("#search-results").setHTML(html);
	                    _renderRoute();
	                }
	            }
	        })
	    }
	}, {
	    ATTRS: {	        	        
	        routes: {
	            value: [
	                {path: '/',                  callback: 'hendleIndex'},
	                {path: '/search/:query',     callback: 'handleSearch'}, 
	                {path: '/directions/:query', callback: 'handleDirections'}
	            ]
	        }, 
	        search: {
	            value: MQ_DATA.search
	        }, 
	        route: {
	            value: MQ_DATA.route
	        }, 
	        activeInput: {
	            value: Y.one('#lhp-content form > input:nth-child(1)')
	        }, 
	        pois: {
	            value: {}
	        }, 
	        directions: {
	            value: []
	        }
	    }
	});	
	
	var _app = Y_Main.namespace('mqlite').$mqliteApp = new Y.MQLiteApp({});
	
	_app.getSearchByPlaceId = function(place_id){
	    var searchResults = this.get('search'), result, i = 0;
	    while(result = searchResults[i++]){
	        if(result.place_id === place_id) return result; 
	    }
	}
});
