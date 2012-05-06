require "net/http"
require "uri"
require "cgi"

class Api::OpenMapsController < ApplicationController
  
  
  def search
    begin 
      uri = URI.parse(searchUrl(CGI.escape(params[:query])))
      
      http = Net::HTTP.new(uri.host, uri.port)
      request = Net::HTTP::Get.new(uri.request_uri)
      response = http.request(request)
      render :json => response.body
    rescue 
      # TODO: Find better way of handling cannelled ajax requests
      render :text => ""
    end 
  end

  def route
    uri = URI.parse(self.directionsUrl(CGI.escape(params[:from_lat]), 
                                       CGI.escape(params[:from_lon]), 
                                       CGI.escape(params[:to_lat]), 
                                       CGI.escape(params[:to_lon])))
                              
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri);
    
    response = http.request(request);
    
    render :json => response.body
  end
  
  private 
  
  def searchUrl(query)
    return "http://open.mapquestapi.com/nominatim/v1/search?format=json&q=" + query
  end
  
  def directionsUrl(from_lat, from_lon, to_lat, to_lon)
    return "http://open.mapquestapi.com/directions/v0/route?outFormat=json&routeType=shortest&timeType=1&" +
      "enhancedNarrative=false&shapeFormat=raw&generalize=200&locale=en_GB" +
      "&unit=m&from=" + from_lat + "," + from_lon + "&" +
      "to=" + to_lat + "," + to_lon +"&drivingStyle=2&highwayEfficiency=21.0"
  end
end
