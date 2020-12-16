class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :barbershop_client_id
end
