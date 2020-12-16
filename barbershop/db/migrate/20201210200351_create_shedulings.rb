class CreateShedulings < ActiveRecord::Migration[6.0]
  def change
    create_table :shedulings do |t|
      t.datetime :time
      t.belongs_to :customer
      t.belongs_to :barbershop_client

      t.timestamps
    end
  end
end
