require 'test_helper'

class Ajax::OpenMapsControllerTest < ActionController::TestCase
  test "should get search" do
    get :search
    assert_response :success
  end

  test "should get route" do
    get :route
    assert_response :success
  end

end
