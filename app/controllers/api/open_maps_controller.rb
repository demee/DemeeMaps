require "net/http"
require "uri"
require "cgi"
require "lib/open_maps/open_maps_url_builder"

class Api::OpenMapsController < ApplicationController

  def initialize
    @open_maps_service = OpenMapsUrlBuilder.new
  end

  def search
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
