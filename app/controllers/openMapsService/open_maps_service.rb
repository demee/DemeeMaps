# To change this template, choose Tools | Templates
# and open the template in the editor.

class OpenMapsService
  def initialize
    
  end
  
  def search(query)
    uri = URI.parse(searchUrl(query))
      
    http = Net::HTTP.new(uri.host, uri.port)
    open_maps_request = Net::HTTP::Get.new(uri.request_uri)
    open_maps_response = http.request(open_maps_request)
      
    return open_maps_response
  end
  
  def route(from_lat, from_lon, to_lat, to_lon)
    
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
