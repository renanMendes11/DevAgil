# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_11_190510) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "street"
    t.string "state"
    t.string "city"
    t.string "zip_code"
    t.string "number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["zip_code"], name: "index_addresses_on_zip_code", unique: true
  end

  create_table "barbershop_clients", force: :cascade do |t|
    t.string "name"
    t.string "phone"
    t.float "rating"
    t.bigint "address_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["address_id"], name: "index_barbershop_clients_on_address_id"
    t.index ["user_id"], name: "index_barbershop_clients_on_user_id"
  end

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.string "cpf"
    t.string "phone"
    t.bigint "address_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["address_id"], name: "index_customers_on_address_id"
    t.index ["cpf"], name: "index_customers_on_cpf", unique: true
    t.index ["user_id"], name: "index_customers_on_user_id"
  end

  create_table "services", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.bigint "barbershop_client_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["barbershop_client_id"], name: "index_services_on_barbershop_client_id"
  end

  create_table "shedulings", force: :cascade do |t|
    t.datetime "time"
    t.bigint "customer_id"
    t.bigint "barbershop_client_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["barbershop_client_id"], name: "index_shedulings_on_barbershop_client_id"
    t.index ["customer_id"], name: "index_shedulings_on_customer_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "authentication_token", limit: 30
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
