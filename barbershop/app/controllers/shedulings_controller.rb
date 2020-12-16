class ShedulingsController < ApplicationController
    before_action :set_sheduling, only: [:show, :update, :destroy]

  # GET /sheduling
  def index
    @shedulings = Sheduling.all

    render json: @shedulings
  end

  def shedulingsCustomer
    @shedulings = Sheduling.where(customer_id: params[:id])

    render json: @shedulings
  end

  def shedulingsBarbershopClient
    @shedulings = Sheduling.where(barbershop_client_id: params[:id])

    render json: @shedulings
  end

  # GET /sheduling/1
  def show
    render json: @sheduling
  end

  # POST /sheduling
  def create
    timeValue = params.dig(:sheduling, :month) << " " << params.dig(:sheduling, :day) << " " << params.dig(:sheduling, :year) << " " << params.dig(:sheduling, :hour) << ":" << params.dig(:sheduling, :minutes)
    @shedulingExists = Sheduling.where(customer_id: params.dig(:sheduling, :customer_id), barbershop_client_id: params.dig(:sheduling, :barbershop_client_id), time: DateTime.parse(timeValue)).first
    if @shedulingExists
      render :status => 400
    else  
      @sheduling = Sheduling.new(customer_id: params.dig(:sheduling, :customer_id), barbershop_client_id: params.dig(:sheduling, :barbershop_client_id), time: DateTime.parse(timeValue))
      
      if @sheduling.save
        render json: @sheduling, status: :created, location: @sheduling
      else
        render json: @sheduling.errors, status: :unprocessable_entity
      end
    end  
  end

  # PATCH/PUT /sheduling/1
  def update
    timeValue = params.dig(:sheduling, :month) << " " << params.dig(:sheduling, :day) << " " << params.dig(:sheduling, :year) << " " << params.dig(:sheduling, :hour) << ":" << params.dig(:sheduling, :minutes)
    if @sheduling.update(customer_id: params.dig(:sheduling, :customer_id), barbershop_client_id: params.dig(:sheduling, :barbershop_client_id), time: DateTime.parse(timeValue))
      render json: @sheduling
    else
      render json: @sheduling.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sheduling/1
  def destroy
    @sheduling.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sheduling
      @sheduling = Sheduling.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def sheduling_params
      params.require(:sheduling).permit(:customer_id, :barbershop_client_id, :month, :day, :year, :hour, :minutes)
    end
end
