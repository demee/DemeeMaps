require.config({
  paths: {
    jquery:     'lib/jquery',
    jqueryui:   'lib/jqueryui',
    bootstrap:  'lib/bootstrap',
    backbone:   'lib/backbone',
    underscore: 'lib/underscore',
    leaflet:    'lib/leaflet',
    'jquery-form-serializer': 'lib/jquery-form-serializer'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery']
    },
  }
});


require([
  'underscore',
  'jquery',
  'backbone',
  'views/map',
  'views/navbar',
  'views/lhp',
  'routers/lhp'
],
function(_, $, Backobne, Map, Navbar, Lhp, LhpRouter){
  "use strict";

  // Global ajax config
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

  // jQuery callback on Page Load
  $(function(){
    var lhp_router = new LhpRouter(),
        map    = new Map({el: $("#map")}),
        navbar = new Navbar({el: $("#navbar")}),
        lhp    = new Lhp({el: $('#lhp')}, lhp_router);

    map.render();
    navbar.render();
    lhp.render();

    // If all of the routers are called already:
    Backbone.history.start({
      pushState: true, //use full url HTML5 history
      silent: true     //do not fire route events on plage load
    });


  });
});
