module API::V1::Helpers
  module SharedParams
    extend Grape::API::Helpers

    params :event do
      requires :name,        type: String
      requires :location,    type: String
      requires :latitude,    type: String
      requires :longitude,   type: String
      optional :starts,      type: DateTime
      optional :ends,        type: DateTime
      optional :description, type: String
    end # :event
  end # SharedParams
end