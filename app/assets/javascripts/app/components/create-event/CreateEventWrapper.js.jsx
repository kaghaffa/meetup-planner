define([
  'react',
  'react-router',
  'app/components/create-event/CreateEventHeader',
  'app/components/create-event/CreateEventForm'
], function(React, ReactRouter, CreateEventHeader, CreateEventForm) {
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