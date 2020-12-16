class ServicesController < ApplicationController
    before_action :set_service, only: [:show, :update, :destroy]

  # GET /service
  def index
    @service = Service.all

    render json: @service
  end

  # GET /service/1
  def show
    render json: @service
  end

  # POST /service
  def create
    @service = Service.new(service_params)

    if @service.save
      render json: @service, status: :created, location: @service
    else
      render json: @service.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /service/1
  def update
    if @service.update(service_params)
      render json: @service
    else
      render json: @service.errors, status: :unprocessable_entity
    end
  end

  # DELETE /service/1
  def destroy
    @service.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_service
      @service = Service.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def service_params
      params.require(:service).permit(:name, :description, :barbershop_client_id)
    end
end
