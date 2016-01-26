module API::V1::Helpers
  module UserHelpers
    def warden
      env['warden']
    end

    def sign_in(user)
      scope = ::Devise::Mapping.find_scope!(user)
      warden.session_serializer.store(user, scope)
    end

    def current_user
      @__current_user ||= warden.authenticate(scope: :user)
    end

    def authenticate_user!(message="Must be logged in.")
      error!(message, 401) unless current_user
    end
  end
end