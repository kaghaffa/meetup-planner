module API::V1::Helpers
  module SharedParams
    extend Grape::API::Helpers

    params :event do
      requires :name,        type: String
      requires :location,    type: String
      requires :latitude,    type: String
      requires :longitude,   type: String
      optional :host,        type: String
      optional :starts,      type: String
      optional :ends,        type: String
      optional :description, type: String
      optional :guest_list,  type: String
      optional :event_type,  type: String
    end # :event
  end # SharedParams
end