define([
  'underscore',
  'jquery',
  'backbone'
], function(_, $, Backbone){
  'use strict';

  var LhpRouter = Backbone.Router.extend({
    routes: {
      'search/:query':        'search',
      'search/:query/p:page': 'search',
      'directions/:query':    'directions'
    },
    search: function(query, page){
      console.log(query, page);
    },
    directions: function(query){
      console.log(query);
    }
  });

  return LhpRouter;

});
