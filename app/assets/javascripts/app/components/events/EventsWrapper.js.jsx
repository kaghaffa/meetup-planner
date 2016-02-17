define([
  'react',
  'react-router',
  'lodash',
  'app/components/events/EventsHeader',
  'app/components/events/EventsList',
  'app/actions/eventActions',
  'app/stores/eventStore'
], function(React, ReactRouter, _, EventsHeader, EventsList, EventActions,
  EventStore) {

  return React.createClass({

    getInitialState: function() {
      return {
        events: EventStore.getEvents()
      };
    },

    componentDidMount: function() {
      EventStore.addChangeListener(this._onEventsChange)

      if (_.isEmpty(this.state.events)) {
        EventActions.get();
      }
    },

    componentWillUnmount: function() {
      EventStore.removeChangeListener(this._onEventsChange)
    },

    _onEventsChange: function() {
      this.setState({
        events: EventStore.getEvents()
      });
    },

    render: function() {
      return (
        <div className="events-wrapper">
          <EventsHeader />
          <EventsList events={ this.state.events } />
        </div>
      )
    }

  });
});