class SessionsController < ApplicationController
    def create
        @user = User.where(email: params[:email]).first

        if @user&.valid_password?(params[:password])
            @customer = Customer.where(user_id: @user.id).first
            if @customer
                render json: @customer.to_json(:include => :user), status: :created
            else
                @barbershopClient = BarbershopClient.where(user_id: @user.id).first
                if @barbershopClient
                    render json: @barbershopClient.to_json(:include => :user), status: :created
                end
            end
        else
            head(:unauthorized)
        end
    end

    def destroy
        @user = User.where(email: params[:email]).first
        @user.authentication_token = nil
        if @user.save
            head(:ok)
        else
            head(:unauthorized)
        end
    end
end
