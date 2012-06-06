require 'mongo'
include Mongo

class Api::CollectionsController < ApplicationController

  def save
    begin
      
      db = Connection.new.db('collab');
      itinerary = db.collection('itinerary');
      
      new_post = { :title => "RubyLearning.com, its awesome", :content => "This is a pretty sweet way to learn Ruby", :created_on => Time.now }
      itinerary_id = itinerary.insert(new_post);
      
       
      mongo_response = itinerary_id;
      #
      # TODO: mongo call to save
      #
    rescue
      render :json => "[]"
    ensure
      render :json => mongo_response
    end
  end
  

end
