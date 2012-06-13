require 'mongo'
include Mongo

class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter
  
  def index
      if params['id'] != nil
        
        db = Connection.new.db('collab');
        itinerary = db.collection('itinerary');
        
        id = BSON::ObjectId("4fcf6e755ca907140100000e"); #hard coded!
        
        itinerary_list = itinerary.find({"_id" => id});
  
        @collection_results = itinerary_list.to_a;
      end    
    
        
       render :layout => "application"
    
  end
  
  private
    before_filter :instantiate_controller_and_action_names

    def instantiate_controller_and_action_names
        @current_action = action_name
        @current_controller = controller_name
    end
end
