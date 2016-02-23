module API::V1::Resources
  class Events < Grape::API
    resource 'events' do
      helpers API::V1::Helpers::SharedParams

      helpers do
        def event
          @__event ||= Event.find_by_token(params[:token])
        end

        def assert_event_ownership!(event)
          unless event.user_id == current_user.id
            error('this event not associated with this user', 401)
          end
        end

        def assert_event_existence!(event)
          error(:no_such_event, 404) unless event
        end
      end

      get do
        events = current_user && current_user.events
        present events, with: API::V1::Entities::Event
      end # get

      ##
      # POST /v1/events
      params do
        use :event
      end
      post do
        event = Event.create!(declared(params).merge(
          user_id: current_user.id
        ))

        present event, with: API::V1::Entities::Event
      end # post

      ##
      # GET /v1/events
      get do
        present current_user.events, with: API::V1::Entities::Event
      end # get

      namespace ':token' do
        ##
        # GET /v1/events/:token
        get do
          assert_event_ownership!
          assert_event_existence!

          present event, with: API::V1::Entities::Event
        end # get

        ##
        # PUT /v1/events/:token
        params do
          use :event
        end
        put do
          assert_event_ownership!
          assert_event_existence!

          event = event.update_attributes!(params)
          present event, with: API::V1::Entities::Event
        end # put

        ##
        # DELETE /v1/events/:token
        delete do
          assert_event_ownership!
          assert_event_existence!

          event.delete!
          status(200)
        end # delete
      end # :token
    end # events
  end # Events
end