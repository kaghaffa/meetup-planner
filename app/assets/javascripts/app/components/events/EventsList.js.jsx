define([
  'react',
  'react-router',
  'app/components/events/EventListItem',
], function(React, ReactRouter, EventListItem) {

  return React.createClass({

    propTypes: {
      events: React.PropTypes.array.isRequired
    },

    render: function() {
      var eventListItems = this.props.events.map(function(event, index) {
        return <EventListItem key={ index } event={ event } />;
      });

      return (
        <div className="events-list">
          { eventListItems }
        </div>
      )
    }

  });
});