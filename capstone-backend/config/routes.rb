Rails.application.routes.draw do
  resources :issues
  resources :publications
  resource :articles



  # post '/publications', to: 'publications#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
