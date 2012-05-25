Y_Main.use('app', 'pjax', function(Y){	
	Y.MQLiteApp = Y.Base.create('MQLiteApp', Y.App, [], {
	    views: {
	    	index: {},
	        search: {}
	    },
	    hendleIndex: function (req) {
	        
	    },	
	    handleSearch: function (req) {
	    	 var request = Y.io(req.path, {
	    	 	headers: {"x-pjax": true},
	    	 	on: {
	    	 		success: function(transactionid, response, arguments){
	    	 			Y.one("#search-results").setHTML(response.responseText);
	    	 		}
	    	 	}
	    	 });	    	
	    }
	}, {
	    ATTRS: {	        	        
	        routes: {
	            value: [
	                {path: '/',              callback: 'hendleIndex'},
	                {path: '/search/:query', callback: 'handleSearch'}
	            ]
	        }
	    }
	});	
	var app = Y_Main.namespace('mqlite').$mqliteApp = new Y.MQLiteApp({});
});
