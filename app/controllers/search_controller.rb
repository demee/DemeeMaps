require 'rubygems'
require 'json'
require "lib/open_maps/open_maps_service"

class SearchController < ApplicationController
  protect_from_forgery
  before_filter
  
  def initialize 
    @open_maps_service = OpenMapsService.new
  end
  
  def index    
    render :layout => 'application'
  end
  
  def search              
      @open_maps_response = @open_maps_service.search(CGI.escape(params[:query]))            
      @search_results = JSON.parse @open_maps_response.body
      
      render 'search/search', :layout => "application"   
  end
   
end
