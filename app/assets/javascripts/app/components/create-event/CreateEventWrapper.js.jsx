define([
  'react',
  'react-router',
  'app/components/create-event/CreateEventHeader'
], function(React, ReactRouter) {
  'use strict';

  return React.createClass({

    render: function() {
      return (
        <div className="create-event-wrapper">
          <CreateEventHeader />
          <CreateEventForm />
        </div>
      );
    }

  });
});