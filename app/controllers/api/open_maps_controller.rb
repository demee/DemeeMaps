require "net/http"
require "uri"
require "cgi"

class Api::OpenMapsController < ApplicationController
  open_maps_service = OpenMapsService.new;
  
  def search
    
    begin
      open_maps_response = open_maps_service.search(CGI.escape(params[:query]));
    rescue 
      render :json => "[]"
    ensure
      render :json => open_maps_response.body
    end
  end

  def route
    begin 
      open_maps_response = open_maps_service.route(CGI.escape(params[:from_lat]), 
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
