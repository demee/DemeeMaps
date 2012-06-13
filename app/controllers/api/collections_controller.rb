require 'mongo'
require 'pusher'

include Mongo

class Api::CollectionsController < ApplicationController

  Pusher.app_id = '22076'  #HACK
  Pusher.key = '39def9c4196cbd0bee85'
  Pusher.secret = 'eb44b4e71b0663dbbe97'

  def save
    begin
      
      db = Connection.new.db('collab');
      itinerary = db.collection('itinerary');

      id = params['poi']['id'];
      lon = params['poi']['lon'];
      lat = params['poi']['lat'];
      name = params['poi']['name'];
        
      ##new_post = {:pois => [{:id => id, :lon  => lon, :lat => lat, :name => name}]};
        
      ##coll.update({"_id" => id}, {"$set" => {"name" => "MongoDB Ruby"}})

      new_post = { "$pushAll" => {  "pois" => [{  "name" => name, "id" => id, "lon" => lon, "lat" =>  lat }] } };
      
      #   
      # db.itinerary.update({"_id" : ObjectId("4fcf6e755ca907140100000e")}  , { $pushAll: {  "pois": [{"name" : "heather"}] } })
      #  
        
      itinerary_id = itinerary.update({"_id" => BSON::ObjectId("4fcf6e755ca907140100000e")}, new_post);
        
      #push message to clients  
      Pusher['save_channel'].trigger('save_event', {:id => id, :lon => lon, :lat => lat, :name => name})
                 
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
  
  def delete
     begin
       
       db = Connection.new.db('collab');
       itinerary = db.collection('itinerary');
 
       id = params['id'];
       
         puts id
       #db.itinerary.update({"_id" : ObjectId("4fcf6e755ca907140100000e")},
       #      {$pull : {"pois":         { "id" : "79425165" }}},false,true);  
       item = { "$pull" => {  "pois" => {  "id" => id } } };       
       result = itinerary.update({"_id" => BSON::ObjectId("4fcf6e755ca907140100000e")}, item);
         puts "result is:" + result.to_s;
                
         
       #push message to clients  
       Pusher['delete_channel'].trigger('delete_event', {:id => id})

       mongo_response = result;
       
     rescue
       render :json => "[]"
     ensure
       render :json => mongo_response
     end
   end
  

  def get
      begin
        
        db = Connection.new.db('collab');
        itinerary = db.collection('itinerary');
        
        id = params['id'];
        puts id;
        #existing_post = {"_id" => id};
        #itinerary_pois = itinerary.find(new_post);
                 
        mongo_response = nil;
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
