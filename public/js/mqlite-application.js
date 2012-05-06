Y_Main.use('app', function(Y){
	
	Y.MQLiteApp = Y.Base.create('MQLiteApp', Y.App, [], {
	    views: {
	    	home: {preserve: true},
	        search: {preserve: true},
	        directions: {preserve: true}
	    },
	
	    // Default route handlers inherited by all CustomApp instances.
	
	    handleHome: function (req) {
	        
	    },
	
	    handleSearch: function (req) {
	        
	    },
	
	    handleDirections: function (req) {
	        
	    }
	}, {
	    ATTRS: {
	        // Share these routes with all CustomApp instances.
	        routes: {
	            value: [
	                {path: '/',             callback: 'handleHome'},
	                {path: '/search',       callback: 'handleUsers'},
	                {path: '/directions', callback: 'handleUser'}
	            ]
	        }
	    }
	});
	
	// Create a CustomApp instance that inherits the defaults and adds to them.
	Y_Main.namespace('mqlite').$mqliteApp = new Y.MQLiteApp({
	    // Register an additional view. The `home`, `users`, and `user` views will
	    // also be inherited.
	    views: {
	        about: {preserve: true}
	    }
	});
});
