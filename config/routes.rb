App::Application.routes.draw do
  root to: 'app#show'

  mount API::Root => '/api'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    passwords: 'users/passwords'
  }


  get '/create' => 'app#show'
end
