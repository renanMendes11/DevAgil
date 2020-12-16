class BarbershopClient < ApplicationRecord
  belongs_to :address
  belongs_to :user
  has_many :services
  has_many :shedulings
end
