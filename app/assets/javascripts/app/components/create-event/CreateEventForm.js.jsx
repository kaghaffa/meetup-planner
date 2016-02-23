define([
  'react',
  'react-router',
  'lodash',
  'app/actions/eventActions',
  'app/stores/eventStore',
  'datepicker',
  'moment',
  'bootstrap'
], function(React, ReactRouter, _, EventActions, EventStore, DatePicker, moment) {
  'use strict';

  return React.createClass({

    getInitialState: function() {
      return {
        eventName: "",
        location: "",
        startDate: moment().format("MM-DD-YYYY"),
        startTime: "",
        endDate: moment().format("MM-DD-YYYY"),
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

    _handleDayClick: function(field, day) {
      console.log(arguments)
      var nextState = _.cloneDeep(this.state);
      nextState[field] = day;
      this.setState(nextState);
    },

    render: function() {
      return (
        <div className="col-md-8 col-md-offset-2 well">
          <form onSubmit={ this._onSubmitForm }>
            <h4>Event details</h4>
            <div className="row">
              <div className="col-md-12 form-group">
                <label htmlFor="eventName">EVENT NAME *</label>
                <input
                  className="form-control"
                  type='text'
                  id='eventName'
                  placeholder='Give it a short, unique name'
                  value={ this.state.eventName }
                  onChange={ this._handleInputChange.bind(this, "eventName") }
                  required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-6 form-group">
                <label htmlFor="location">LOCATION</label>
                <input
                  className="form-control"
                  type='text'
                  id='location'
                  placeholder='San Francisco, CA'
                  value={ this.state.location }
                  onChange={ this._handleInputChange.bind(this, "location") } />
              </div>

              <div className="col-md-6 col-sm-6 form-group">
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
              <div className="col-md-6 form-group">
                <label htmlFor="start-date">STARTS</label>
                <DatePicker
                  inputFieldId="start-date"
                  format="MM-DD-YYYY"
                  onChange={ this._handleDayClick.bind(this, "startDate") }
                  minDate={ moment().format("MM-DD-YYYY") }
                  openOnInputFocus={ true }
                  hideIcon={ true }
                  date={ this.state.startDate } />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="end-date">ENDS</label>
                <DatePicker
                  inputFieldId="end-date"
                  format="MM-DD-YYYY"
                  onChange={ this._handleDayClick.bind(this, "endDate") }
                  minDate={ moment().format("MM-DD-YYYY") }
                  openOnInputFocus={ true }
                  hideIcon={ true }
                  date={ this.state.endDate } />
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
        </div>
      );
    }

  });
});