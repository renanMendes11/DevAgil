class CustomerSerializer < ActiveModel::Serializer
  belongs_to :address
  belongs_to :user
  has_many :shedulings

  attributes :id, :name, :cpf, :phone
end
