require "lib/open_maps/open_maps_service"

class Api::OpenMapquestController < ApplicationController

  def initialize
    @open_maps_service = OpenMapsService.new
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
  
  def route
    begin
      open_maps_response = @open_maps_service.route(CGI.escape(params[:from_lat]),
                                                   CGI.escape(params[:from_lon]), 
                                                   CGI.escape(params[:to_lat]), 
                                                   CGI.escape(params[:to_lon]))
    rescue 
      render :json => "[]"
    ensure 
      render :json => open_maps_response.body
    end 
  end
end
