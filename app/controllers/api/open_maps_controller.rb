require "net/http"
require "uri"
require "cgi"

class Api::OpenMapsController < ApplicationController
  def search
    uri = URI.parse("http://open.mapquestapi.com/nominatim/v1/search?format=json&q=" + CGI.escape(params[:query]))   
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
    
    render :json => response.body
        
  end

  def route
    uri = URI.parse("http://open.mapquestapi.com/directions/v0/route?outFormat=json&routeType=shortest&timeType=1&" +
                              "enhancedNarrative=false&shapeFormat=raw&generalize=200&locale=en_GB" +
                              "&unit=m&from=" + CGI.escape(params[:from_lat]) + "," + CGI.escape(params[:from_lon]) + "&" +
                              "to=" + CGI.escape(params[:to_lat]) + "," + CGI.escape(params[:to_lon]) +"&drivingStyle=2&highwayEfficiency=21.0");
                              
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri);
    
    response = http.request(request);
    
    render :json => response.body
  end
end
