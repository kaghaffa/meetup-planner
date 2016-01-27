class Users::SessionsController < Devise::SessionsController
  respond_to :json

  layout 'layouts/static_application'

  def after_sign_in_path_for(resource)
    '/dashboard'
  end
end