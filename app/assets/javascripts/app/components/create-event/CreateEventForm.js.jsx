define([
  'react',
  'react-router',
  'lodash',
  'app/actions/eventActions',
  'app/stores/eventStore'
], function(React, ReactRouter, _, EventActions, EventStore) {
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

    _handleInputChange: function(field, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = e.target.value;
      this.setState(nextState);
    },

    _onSubmitForm: function() {
      var createEventData = {};
      EventActions.create(createEventData);
    },

    render: function() {
      return (
        <form className="col-md-8 col-md-offset-2" onSubmit={ this._onSubmitForm }>
          <h4>Event details</h4>
          <div className="row">
            <div className="col-md-12 form-group">
              <label htmlFor="eventName">EVENT NAME *</label>
              <input
                className="form-control"
                type='text'
                id='eventName'
                placeholder='placeholder'
                value={ this.state.eventName }
                onChange={ this._handleInputChange.bind(this, "eventName") }
                required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-group">
              <label htmlFor="location">LOCATION</label>
              <input
                className="form-control"
                type='text'
                id='location'
                placeholder='placeholder'
                value={ this.state.location }
                onChange={ this._handleInputChange.bind(this, "location") } />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-group">
              <label htmlFor="eventType">EVENT TYPE *</label>
              <input
                className="form-control"
                type='text'
                id='eventType'
                placeholder='placeholder'
                value={ this.state.eventType }
                onChange={ this._handleInputChange.bind(this, "eventType") }
                required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 form-group">
              <label htmlFor="location">START</label>
            </div>
            <div className="col-md-3 form-group">
            </div>
            <div className="col-md-3 form-group">
              <label htmlFor="location">END</label>
            </div>
            <div className="col-md-3 form-group">
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-group">
              <label htmlFor="description">DESCRIPTION</label>
              <textarea
                className="form-control"
                type='text'
                id='description'
                placeholder=''
                value={ this.state.description }
                onChange={ this._handleInputChange.bind(this, "description") }
                required />
            </div>
          </div>

          <button type="submit" className="btn btn-success pull-right">Create</button>
        </form>
      );
    }

  });
});