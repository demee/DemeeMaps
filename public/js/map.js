YUI.add('mqlite-map', function(Y){
	"use strict"; 
	
	/* global: L */
	
   
	
      /*Create an object for options*/ 
      var options={
        elt:document.getElementById('map'),       /*ID of element on the page where you want the map added*/ 
        zoom:10,                                  /*initial zoom level of the map*/ 
        latLng:{lat:39.743943, lng:-105.020089},  /*center of map in latitude/longitude */ 
        mtype:'map',                              /*map type (map)*/ 
        bestFitMargin:0,                          /*margin offset from the map viewport when applying a bestfit on shapes*/ 
        zoomOnDoubleClick:true                    /*zoom in when double-clicking on map*/ 
      };

      /*Construct an instance of MQA.TileMap with the options object*/ 
      window.map = new MQA.TileMap(options);
      
      MQA.withModule('largezoom','traffictoggle','viewoptions','geolocationcontrol','insetmapcontrol','mousewheel', function() {
	
	    map.addControl(
	      new MQA.LargeZoom(),
	      new MQA.MapCornerPlacement(MQA.MapCorner.TOP_RIGHT, new MQA.Size(5,50))
	    );
	
	    map.addControl(
	    	new MQA.TrafficToggle(), 
	    	new MQA.MapCornerPlacement(MQA.MapCorner.TOP_RIGHT, new MQA.Size(70, 65))
	    );
	
	    map.addControl(
	    	new MQA.ViewOptions(),
	    	new MQA.MapCornerPlacement(MQA.MapCorner.TOP_RIGHT, new MQA.Size(70, 65))
	    );
	
	    map.addControl(
	      new MQA.GeolocationControl(),
	      new MQA.MapCornerPlacement(MQA.MapCorner.TOP_RIGHT, new MQA.Size(18,265))
	    );
	
	    /*Inset Map Control options*/ 
	    var options={
	      size:{width:150, height:125},
	      zoom:3,
	      mapType:'map',
	      minimized:true };
	
	    map.addControl(
	      new MQA.InsetMapControl(options),
	      new MQA.MapCornerPlacement(MQA.MapCorner.BOTTOM_RIGHT)
	    );
	
	    map.enableMouseWheelZoom();
	  });

    
});
