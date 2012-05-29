require "lib/mapquest/mapquest_service"

class Api::MapquestController < ApplicationController
  def initialize
    @mapquest_service = MapquestService.new
  end
  
  def autocomplete
    begin 
      open_maps_response = @mapquest_service.search(CGI.escape(params[:query]))
    rescue
      render :json => "[]"
    ensure
      render :json => open_maps_response.body
    end
  end
end
