class ApplicationController < ActionController::Base
  protect_from_forgery

  def partial_render?
    request.headers['X-Requested-With'] == 'XMLHttpRequest'
  end
end
