class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :street
      t.string :state
      t.string :city
      t.string :zip_code
      t.string :number
      
      t.timestamps
    end
    add_index :addresses, :zip_code, unique: true
  end
end
