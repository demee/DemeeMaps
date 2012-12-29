require 'mapquest_open.rb'

class SearchController < ApplicationController

  def initialize
    @map_api = MapApi::MapquestOpen.new
    super
  end

  def search
    @search_query   = params[:query]
    @search_results = @map_api.search(@search_query).parsed_response

    if partial_render?
      render :layout => false
    end

  end
end
