require "lib/open_maps/open_maps_service"

class Api::OpenMapquestController < ApplicationController

  def initialize
    @open_maps_service = OpenMapsService.new
  end
  
  def search 
     open_maps_response = @open_maps_service.search(CGI.escape(params[:query]))
     render :json => open_maps_response.body
  end 
  
  def autocomplete
    begin 
      open_maps_response = @open_maps_service.search(CGI.escape(params[:query]))
    rescue
      render :json => "[]"
    ensure
      render :json => open_maps_response.body
    end
  end
  
  def directions
    begin
      query = params[:query]
      open_maps_response = @open_maps_service.directions(query);
    rescue 
      render :json => "[]"
    ensure 
      render :json => open_maps_response.body
    end 
  end
end
