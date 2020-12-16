class CreateServices < ActiveRecord::Migration[6.0]
  def change
    create_table :services do |t|
      t.string :name
      t.string :description
      t.belongs_to :barbershop_client
      t.timestamps
    end
  end
end
