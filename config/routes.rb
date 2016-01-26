App::Application.routes.draw do

  mount API::Root => '/api'
  devise_for :users
  root to: 'app#show'

end
