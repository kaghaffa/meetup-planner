module API::V1::Helpers
  module ErrorHelpers
    def invalid_request!(message = "Request was not valid")
      error!(message, 400)
    end

    def access_denied!(message = "Access Denied")
      error!(message, 401)
    end
  end
end