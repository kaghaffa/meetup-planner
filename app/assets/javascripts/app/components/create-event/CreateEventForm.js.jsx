define([
  'react',
  'react-router',
  'lodash',
  'app/actions/eventActions',
  'app/stores/eventStore',
  'app/components/shared/Datepicker',
  'moment',
  'async!https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places',
  'app/mixins/googleMapsAutocompleteMixin',
  'bootstrap'
], function(React, ReactRouter, _, EventActions, EventStore, Datepicker, moment,
    GoogleMaps, GoogleMapsAutocompleteMixin) {
  'use strict';

  return React.createClass({

    mixins: [GoogleMapsAutocompleteMixin, ReactRouter.Navigation],

    getInitialState: function() {
      return {
        name: "",
        location: "",
        latitude: "",
        longitude: "",
        startDate: moment().format("YYYY-MM-DD"),
        startTime: "",
        endDate: moment().format("YYYY-MM-DD"),
        endTime: "",
        eventType: "",
        hostName: "",
        guestlist: ""
      };
    },

    componentDidMount: function() {
      this._setUpGoogleMapsAutocomplete();
    },

    _setUpGoogleMapsAutocomplete: function() {
      var _this = this;

      // Set up google maps places autocomplete
      var locationInput = this.refs.location.getDOMNode();
      this._pacSelectFirst(locationInput, this._handleInputChange.bind(this, "location"));

      var autocomplete = new google.maps.places.Autocomplete(locationInput);
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        _this.setState({
          location: locationInput.value,
          latitude: autocomplete.getPlace().geometry.location.lat(),
          longitude: autocomplete.getPlace().geometry.location.lng()
        });
      });
    },

    _handleInputChange: function(field, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = e.target.value;
      this.setState(nextState);
    },

    _onSubmitForm: function(e) {
      e.preventDefault();
      EventActions.create({
        name: this.state.name,
        location: this.state.location,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        starts: this.state.startDate,
        ends: this.state.endDate,
        event_type: this.state.eventType,
        host: this.state.hostName,
        description: this.state.description,
        guest_list: this.state.guestlist
      });
      this.transitionTo('/');
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
              <div className="col-md-6 form-group">
                <label htmlFor="name">Event Name *</label>
                <input
                  className="form-control"
                  type='text'
                  id='name'
                  placeholder='Give it a short, unique name'
                  value={ this.state.name }
                  onChange={ this._handleInputChange.bind(this, "name") }
                  required />
              </div>

              <div className="col-md-6 form-group">
                <label htmlFor="hostName">Host Name *</label>
                <input
                  className="form-control"
                  type='text'
                  id='hostName'
                  placeholder='Individual or organization'
                  value={ this.state.hostName }
                  onChange={ this._handleInputChange.bind(this, "hostName") }
                  required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-6 form-group">
                <label htmlFor="location">Location</label>
                <input
                  className="form-control"
                  type='text'
                  id='location'
                  ref="location"
                  placeholder='San Francisco, CA'
                  value={ this.state.location }
                  onChange={ this._handleInputChange.bind(this, "location") } />
              </div>

              <div className="col-md-6 col-sm-6 form-group">
                <label htmlFor="eventType">Event Type *</label>
                <select
                  onChange={ this._handleInputChange.bind(this, 'eventType') }
                  value={ this.state.eventType }>
                  <option value="attraction">Attraction</option>
                  <option value="class">Class</option>
                  <option value="concert">Concert</option>
                  <option value="conference">Conference</option>
                  <option value="convention">Convention</option>
                  <option value="dinner">Dinner</option>
                  <option value="festival">Festival</option>
                  <option value="game">Game</option>
                  <option value="meeting">Meeting</option>
                  <option value="other">Other</option>
                  <option value="party">Party</option>
                  <option value="race">Race</option>
                  <option value="rally">Rally</option>
                  <option value="retreat">Retreat</option>
                  <option value="screening">Screening</option>
                  <option value="seminar">Seminar</option>
                  <option value="tour">Tour</option>
                  <option value="tournament">Tournament</option>
                  <option value="tradeshow">Tradeshow</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="start-date">Starts</label>
                <Datepicker
                  inputFieldId="start-date"
                  onDateSelectHandler={ this._handleDayClick.bind(this, "startDate") }
                  onChangeHandler={ this._handleInputChange.bind(this, "startDate") }
                  minDate={ moment().format("MM-DD-YYYY") }
                  value={ this.state.startDate } />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="end-date">Ends</label>
                <Datepicker
                  inputFieldId="end-date"
                  onDateSelectHandler={ this._handleDayClick.bind(this, "endDate") }
                  onChangeHandler={ this._handleInputChange.bind(this, "endDate") }
                  minDate={ moment().format("MM-DD-YYYY") }
                  value={ this.state.endDate } />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  type='text'
                  id='description'
                  placeholder='A helpful description of your event'
                  value={ this.state.description }
                  onChange={ this._handleInputChange.bind(this, "description") } />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 form-group">
                <label htmlFor="guestlist">Guestlist</label>
                <textarea
                  className="form-control"
                  type='text'
                  id='guestlist'
                  placeholder='List of guest names'
                  value={ this.state.guestlist }
                  onChange={ this._handleInputChange.bind(this, "guestlist") } />
              </div>
            </div>

            <button type="submit" className="btn btn-success pull-right">Create</button>
          </form>
        </div>
      );
    }
  });
});