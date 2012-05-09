class SearchController < ApplicationController
  protect_from_forgery
  def index
    query = params[:query]
    
   # if query.length > 0
   #   open_maps_response = open_maps_service.search(CGI.escape(query))
   #   @search_results = open_maps_response.response_body
   # end
  end
  
end
