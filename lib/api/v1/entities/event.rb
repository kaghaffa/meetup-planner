module API::V1::Entities
  class Event < Grape::Entity
    expose :name
    expose :host
    expose :guest_list
    expose :starts
    expose :ends
    expose :location
    expose :description
  end
end
