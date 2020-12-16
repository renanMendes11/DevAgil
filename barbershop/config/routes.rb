Rails.application.routes.draw do
  resources :users
  resources :addresses
  resources :services

  resources :barbershop_clients
  resources :customers

  resources :shedulings
  get '/my_shedulings_customer/:id', to: 'shedulings#shedulingsCustomer'
  get '/my_shedulings_barbershopClient/:id', to: 'shedulings#shedulingsBarbershopClient'

  resources :sessions, only: [:create]
  delete '/sessions', to: 'sessions#destroy'

end
