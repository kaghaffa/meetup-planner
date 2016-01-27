class Users::PasswordsController < Devise::RegistrationsController
  respond_to :json

  layout 'layouts/static_application'
end