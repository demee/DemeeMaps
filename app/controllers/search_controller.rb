class SearchController < ApplicationController
  protect_from_forgery
  before_filter

  def initialize
    @open_maps_service = OpenMapsUrlBuilder.new
  end

  def index

  end

  def search
    query = params[:query]
    
    if query.length > 0
      open_maps_response = @open_maps_service.search(CGI.escape(query))
      @search_results = open_maps_response.body
    end


  end
  
end
