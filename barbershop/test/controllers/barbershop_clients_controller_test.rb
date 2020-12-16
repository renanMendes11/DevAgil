require 'test_helper'

class BarbershopClientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @barbershop_client = barbershop_clients(:one)
  end

  test "should get index" do
    get barbershop_clients_url, as: :json
    assert_response :success
  end

  test "should create barbershop_client" do
    assert_difference('BarbershopClient.count') do
      post barbershop_clients_url, params: { barbershop_client: { address_id: @barbershop_client.address_id, name: @barbershop_client.name, phone: @barbershop_client.phone, rating: @barbershop_client.rating, user_id: @barbershop_client.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show barbershop_client" do
    get barbershop_client_url(@barbershop_client), as: :json
    assert_response :success
  end

  test "should update barbershop_client" do
    patch barbershop_client_url(@barbershop_client), params: { barbershop_client: { address_id: @barbershop_client.address_id, name: @barbershop_client.name, phone: @barbershop_client.phone, rating: @barbershop_client.rating, user_id: @barbershop_client.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy barbershop_client" do
    assert_difference('BarbershopClient.count', -1) do
      delete barbershop_client_url(@barbershop_client), as: :json
    end

    assert_response 204
  end
end
