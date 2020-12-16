class BarbershopClientsController < ApplicationController
  before_action :set_barbershop_client, only: [:show, :update, :destroy]

  # GET /barbershop_clients
  def index
    @barbershop_clients = BarbershopClient.all

    render json: @barbershop_clients
  end

  # GET /barbershop_clients/1
  def show
    render json: @barbershop_client
  end

  # POST /barbershop_clients
  def create
    @barbershop_client = BarbershopClient.new(barbershop_client_params)

    if @barbershop_client.save
      render json: @barbershop_client, status: :created, location: @barbershop_client
    else
      render json: @barbershop_client.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /barbershop_clients/1
  def update
    if @barbershop_client.update(barbershop_client_params)
      render json: @barbershop_client
    else
      render json: @barbershop_client.errors, status: :unprocessable_entity
    end
  end

  # DELETE /barbershop_clients/1
  def destroy
    @barbershop_client.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_barbershop_client
      @barbershop_client = BarbershopClient.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def barbershop_client_params
      params.require(:barbershop_client).permit(:name, :phone, :rating, :address_id, :user_id)
    end
end
