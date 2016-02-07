define([
  'react',
  'react-router'
], function(React, ReactRouter) {
  'use strict';

  return React.createClass({

    getInitialState: function() {
        return {
          eventName: "",
          location: "",
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: "",
          eventType: "",
          hostName: ""
        };
    },

    _onSubmitForm: function() {
    },

    render: function() {
      return (
        <div className="create-event-form">
          <form onSubmit={ this._onSubmitForm }>
            <h4>Create Event</h4>

            <div className="row">
              <div className="col-md-12 form-group">
                <label htmlFor="text" />
                <input
                  className="form-control"
                  type="text"
                  id="fullName"
                  placeholder=""
                  value={}
                  onChange={}
              </div>
            </div>
          </form>
        </div>
      );
    }

  });
});