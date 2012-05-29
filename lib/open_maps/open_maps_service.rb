# To change this template, choose Tools | Templates
# and open the template in the editor.
require "json"
require "net/http"
require "uri"
require "cgi"

class OpenMapsService
  def initialize
    
  end
  
  def search(query)
    uri = URI.parse(searchUrl(query))
    getRequest(uri)
  end
  
  def directions(query)
    locationsArray = query.split(';')
  
    locations = Hash.new
    locations['locations'] = Array.new
    
    locationsArray.each do |loc|
      locArr = loc.split(',')
      latLon = Hash.new
      latLon['latLng'] = Hash.new
      latLon['latLng']['lat'] = locArr[1].strip
      latLon['latLng']['lng'] = locArr[2].strip
      locations['locations'].push(latLon) 
    end
    
    
    
    #options 
    
    locations['options'] = Hash.new
    locations['options']["routeType"] = "shortest"
    locations['options']["timeType"] = "1"
    locations['options']["enhancedNarrative"] = "true"
    locations['options']["shapeFormat"] = "raw"
    locations['options']["generalize"] = "200"
    locations['options']["enhancedNarrative"] = "true"
    
    
    uri = URI.parse(directionsUrl()) 
       
    postRequest(uri, locations.to_json)
  end
  
  private

  def getRequest(uri)
    http = Net::HTTP.new(uri.host, uri.port)
    open_maps_request = Net::HTTP::Get.new(uri.request_uri)
    open_maps_response = http.request(open_maps_request)
    
    Rails.logger.error open_maps_response.body.to_str

    open_maps_response
  end
  
  def postRequest(uri, post_body)
    
    puts post_body
    
    http = Net::HTTP.new(uri.host, uri.port)
    open_maps_request = Net::HTTP::Post.new(uri.request_uri)
    open_maps_request.body = post_body
    open_maps_request.content_type = 'application/x-json'
    open_maps_response = http.request(open_maps_request)
    
    Rails.logger.info open_maps_response.body.to_str
    
    open_maps_response  
  end
  
  def searchUrl(query)
    "http://open.mapquestapi.com/nominatim/v1/search?format=json&q=" + query
  end
  
  def directionsUrl()
    "http://open.mapquestapi.com/directions/v0/route?" + "outFormat=json"
  end
  
end
