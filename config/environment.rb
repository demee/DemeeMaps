# Load the rails application
require File.expand_path('../application', __FILE__)
require 'logger'

# Initialize the rails application
MQLite::Application.initialize!

Rails.logger = Logger.new(STDOUT)
Rails.logger.level = 0;
