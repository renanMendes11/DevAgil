class AddressesController < ApplicationController
    before_action :set_address, only: [:show, :update, :destroy]

  # GET /address
  def index
    @address = Address.all

    render json: @address
  end

  # GET /address/1
  def show
    render json: @address
  end

  # POST /address
  def create
    @address = Address.new(address_params)

    if @address.save
      render json: @address, status: :created, location: @address
    else
      render json: @address.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /address/1
  def update
    if @address.update(address_params)
      render json: @address
    else
      render json: @address.errors, status: :unprocessable_entity
    end
  end

  # DELETE /address/1
  def destroy
    @address.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_address
      @address = address.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def address_params
      params.require(:address).permit(:street, :city, :state, :zip_code, :number)
    end
end
