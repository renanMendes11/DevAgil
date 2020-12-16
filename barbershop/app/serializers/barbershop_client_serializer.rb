class BarbershopClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone, :rating
  belongs_to :address
  belongs_to :user
  has_many :services
  has_many :shedulings
end
