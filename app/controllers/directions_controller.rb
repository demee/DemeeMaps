require "json"
require "lib/open_maps/open_maps_service"

class DirectionsController < ApplicationController
  protect_from_forgery
  before_filter
  
  def initialize
     @open_mapquest_service = OpenMapsService.new
  end

  def index
  end
  
  def directions
    query = params[:query]
    
    @open_maps_response = @open_mapquest_service.directions(query)
    
    @dir_results = JSON.parse @open_maps_response.body
    @legs = @dir_results['route']['legs'];
    
    render 'directions/directions', :layout => 'application'
  end
end
