require 'rails_helper'

RSpec.describe User, type: :model do
  context 'Parametros do usuarios' do

    it 'Usuario inválido' do
      userObj = User.new
      userObj.email = 'email'
      expect(userObj.valid?).to be_falsey
    end

    # it 'Criação de um Usuario' do
    #   userObj = User.new
    #   userObj.email = 'email@example.com'
    #   userObj.password = 'password'
    #   userObj.password_confirmation = 'password'
    #   expect(userObj.valid?).to be_truthy
    # end

  end
end
