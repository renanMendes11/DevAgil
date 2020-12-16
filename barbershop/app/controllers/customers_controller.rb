class CustomersController < ApplicationController
    before_action :set_customer, only: [:show, :update, :destroy]

  # GET /customer
  def index
    @customer = Customer.all

    render json: @customer
  end

  # GET /customer/1
  def show
    render json: @customer
  end

  # POST /customer
  def create
    @customer = Customer.new(customer_params)

    if @customer.save
      render json: @customer, status: :created, location: @customer
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /customer/1
  def update
    if @customer.update(customer_params)
      render json: @customer
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /customer/1
  def destroy
    @customer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_customer
      @customer = Customer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def customer_params
      params.require(:customer).permit(:name, :phone, :cpf, :address_id, :user_id)
    end
end
