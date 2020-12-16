class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street, :number, :city, :zip_code
end
