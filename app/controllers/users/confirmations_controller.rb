class Users::ConfirmationsController < Devise::RegistrationsController
  respond_to :json

  layout 'layouts/static_application'
end