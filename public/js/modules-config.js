var Y_Main = YUI({
	filter: 'raw', 
    skin: 'night',
	modules: {		
		'mqlite-map': {
			fullpath: '/js/map.js'
		},		
		'mqlite-navbar': {
			fullpath: '/js/navbar.js'
		},
		'mqlite-main': {
			fullpath: '/js/main.js'
		}, 
		'mqlite-main-open': {
			fullpath: '/js/main_open.js'
		},
		'mqlite-map-leaflet': {
			fullpath: '/js/map_leaflet.js'
		}
	}
});
