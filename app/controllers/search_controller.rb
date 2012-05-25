require 'rubygems'
require 'json'
require "lib/mapquest/mapquest_service"
require "lib/open_maps/open_maps_service"

class SearchController < ApplicationController
  protect_from_forgery
  before_filter
  
  def initialize 
    @mapquest_service = MapquestService.new
    @open_mapquest_service = OpenMapsService.new
  end
  
  def index    
    render :layout => 'application'
  end
  
  def search   
      @query = params[:query]           
      @maps_response = @open_mapquest_service.search(CGI.escape(@query))
                
      results = JSON.parse @maps_response.body
      
      @search_results = results 
      if request.headers["X-PJAX"] == "true"
        render 'search/search'  
      else 
        render 'search/search', :layout => "application"
      end   
  end
   
end
