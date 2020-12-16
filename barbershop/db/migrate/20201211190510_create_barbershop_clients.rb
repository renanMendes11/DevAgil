class CreateBarbershopClients < ActiveRecord::Migration[6.0]
  def change
    create_table :barbershop_clients do |t|
      t.string :name
      t.string :phone
      t.float :rating
      t.belongs_to :address
      t.belongs_to :user

      t.timestamps
    end
    # add_index :barbershop_clients, :address_id, unique: true
    # add_index :barbershop_clients, :user_id, unique: true
  end
end
