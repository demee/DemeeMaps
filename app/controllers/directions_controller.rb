require 'mapquest_open.rb'

class DirectionsController < ApplicationController

  def initialize
    @map_api = MapApi::MapquestOpen.new
    super
  end

  def directions
    query = params[:query]

    destinations = query.split(';')

    direction_results = @map_api.directions(destinations)

    @locations = direction_results['route']['locations']
    @legs      = direction_results['route']['legs']

    if partial_render?
      render :layout => false
    end
  end

end
