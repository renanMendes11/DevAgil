class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :cpf
      t.string :phone
      t.belongs_to :address, unique: true
      t.belongs_to :user, unique: true

      t.timestamps
    end
    add_index :customers, :cpf, unique: true
  end
end
