class SearchController < ApplicationController
  protect_from_forgery
  def index
    @show = true;
  end
end
