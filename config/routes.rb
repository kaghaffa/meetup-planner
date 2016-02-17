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
  get '/events' => 'app#show'

  # Devise
  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end
end
