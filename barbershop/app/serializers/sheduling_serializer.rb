class ShedulingSerializer < ActiveModel::Serializer
  attributes :id, :time, :customer_id, :barbershop_client_id
end
