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
  'bootstrap',
  'timepicker'
], function(React, ReactRouter, _, EventActions, EventStore, Datepicker, moment,
    GoogleMaps, GoogleMapsAutocompleteMixin, Timepicker) {
  'use strict';

  return React.createClass({

    mixins: [GoogleMapsAutocompleteMixin, ReactRouter.Navigation],

    getInitialState: function() {
      return {
        name: null,
        location: null,
        latitude: null,
        longitude: null,
        startDate: moment().format("YYYY-MM-DD"),
        startTime: null,
        endDate: moment().format("YYYY-MM-DD"),
        endTime: null,
        eventType: null,
        hostName: null,
        description: '',
        guestlist: null,
        errors: []
      };
    },

    componentDidMount: function() {
      this._setUpGoogleMapsAutocomplete();
      this.refs.name.getDOMNode().focus();

      // Remove bubble validation
      var forms = document.getElementsByTagName('form');
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('invalid', function(e) {
          e.preventDefault();
        }, true);
      }
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

    _handleChangeAndValidate: function(field, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = e.target.value;
      this.setState(nextState, function() {
        this._validateForm();
      });
    },

    _handleInputChange: function(field, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = e.target.value;
      this.setState(nextState);
    },

    _onSubmitForm: function(e) {
      e.preventDefault();

      var nextState = _.cloneDeep(this.state);
      for (var field in nextState) {
        if (nextState[field] === null) {
          nextState[field] = '';
        }
      };
      this.setState(nextState);

      this._validateForm(function() {
        if (this.state.errors.length || document.getElementsByClassName('invalid').length) {
          return;
        }

        EventActions.create({
          name: this.state.name,
          location: this.state.location,
          longitude: this.state.longitude,
          latitude: this.state.latitude,
          starts: moment(this.state.startDate + " " + this.state.startTime).toString(),
          ends: moment(this.state.endDate + " " + this.state.endTime).toString(),
          event_type: this.state.eventType,
          host: this.state.hostName,
          description: this.state.description,
          guest_list: this.state.guestlist
        });

        EventActions.get();
        this.transitionTo('/');
      });
    },

    _validateForm: function(callback) {
      var errors = [];
      console.log("HI")
      console.log(this.state)

      if (this.state.startDate && this.state.startTime && this.state.endDate && this.state.endTime) {

        var starts = moment(this.state.startDate + " " + this.state.startTime);
        var ends = moment(this.state.endDate + " " + this.state.endTime);

        console.log('hi')
        if (starts > ends) {
          errors.push("Start date/time must come before End date/time")
        }
      }

      if (typeof(callback) === 'function') {
        this.setState({errors: errors}, callback);
      } else {
        this.setState({errors: errors});
      }
    },

    _handleDayClick: function(field, day) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = day;
      this.setState(nextState);
    },

    render: function() {
      var errorAlert;
      if (!_.isEmpty(this.state.errors)) {
        var errorList = this.state.errors.map(function(error, index) {
          return <li key={ index }>{ error }</li>;
        })

        errorAlert = (
          <div className="alert alert-danger" role="alert">
            <ul>{ errorList }</ul>
          </div>
        );
      }

      return (
        <div className="col-md-10 col-md-offset-1 well">
          <form>
            <h4>Event details</h4>
            { errorAlert }
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="name">Event Name *</label>
                <input
                  className={ this.state.name === "" ? "form-control invalid" : 'form-control' }
                  type='text'
                  id='name'
                  ref='name'
                  placeholder='Give it a short, unique name'
                  value={ this.state.name }
                  onBlur={ this._handleInputChange.bind(this, "name") }
                  onChange={ this._handleInputChange.bind(this, "name") }
                  required />
              </div>

              <div className="col-md-6 form-group">
                <label htmlFor="hostName">Host Name *</label>
                <input
                  className={ this.state.hostName === "" ? "form-control invalid" : 'form-control' }
                  type='text'
                  id='hostName'
                  placeholder='Individual or organization'
                  value={ this.state.hostName }
                  onBlur={ this._handleInputChange.bind(this, "hostName") }
                  onChange={ this._handleInputChange.bind(this, "hostName") }
                  required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-6 form-group">
                <label htmlFor="location">Location *</label>
                <input
                  className={ this.state.location === "" ? "form-control invalid" : 'form-control' }
                  type='text'
                  id='location'
                  ref="location"
                  placeholder='San Francisco, CA'
                  value={ this.state.location }
                  onBlur={ this._handleInputChange.bind(this, "location") }
                  onChange={ this._handleInputChange.bind(this, "location") }
                  required />
              </div>

              <div className="col-md-6 col-sm-6 form-group">
                <label htmlFor="eventType">Event Type *</label>
                <select
                  onChange={ this._handleInputChange.bind(this, 'eventType') }
                  value={ this.state.eventType }
                  required >
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
              <div className="col-md-3 col-sm-6 form-group">
                <label htmlFor="start-date">Starts *</label>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                  </span>
                  <Datepicker
                    inputFieldId="start-date"
                    onBlurHandler={ this._validateForm }
                    onDateSelectHandler={ this._handleDayClick.bind(this, "startDate") }
                    onChangeHandler={ this._handleInputChange.bind(this, "startDate") }
                    minDate={ moment().format("MM-DD-YYYY") }
                    value={ this.state.startDate }
                    className={ this.state.startDate === "" ? "form-control invalid" : 'form-control' }
                    required />
                </div>
              </div>

              <div className="col-md-3 col-sm-6 form-group">
                <label htmlFor="start-time" style={{color: 'transparent'}}>-</label>
                <div className="input-group bootstrap-timepicker timepicker">
                  <span className="input-group-addon">
                    <i className="fa fa-clock-o"></i>
                  </span>
                  <input
                    onBlur={ this._handleChangeAndValidate.bind(this, "startTime") }
                    id="start-time"
                    ref="timepicker"
                    className={ this.state.startTime === "" ? "form-control invalid" : 'form-control' }
                    data-provide="timepicker"
                    data-template="false"
                    data-minute-step="5"
                    defaultTime={ this.state.startTime }
                    type="text"
                    required />
                </div>
              </div>

              <div className="col-md-3 col-sm-6 form-group">
                <label htmlFor="end-date">Ends *</label>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                  </span>
                  <Datepicker
                    inputFieldId="end-date"
                    onBlurHandler={ this._validateForm }
                    onDateSelectHandler={ this._handleDayClick.bind(this, "endDate") }
                    onChangeHandler={ this._handleInputChange.bind(this, "endDate") }
                    minDate={ moment().format("MM-DD-YYYY") }
                    value={ this.state.endDate }
                    className={ this.state.endDate === "" ? "form-control invalid" : 'form-control' }
                    required />
                </div>
              </div>

              <div className="col-md-3 col-sm-6 form-group">
                <label htmlFor="end-time" style={{color: 'transparent'}}>-</label>
                <div className="input-group bootstrap-timepicker timepicker">
                  <span className="input-group-addon">
                    <i className="fa fa-clock-o"></i>
                  </span>
                  <input
                    onBlur={ this._handleChangeAndValidate.bind(this, "endTime") }
                    id="timepicker"
                    ref="timepicker"
                    className={ this.state.endTime === "" ? "form-control invalid" : 'form-control' }
                    data-provide="timepicker"
                    data-template="modal"
                    data-minute-step="5"
                    data-modal-backdrop="true"
                    defaultTime={ this.state.endTime }
                    type="text"
                    required />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 form-group">
                <label htmlFor="description">Description (optional)</label>
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
                <label htmlFor="guestlist">Guestlist *</label>
                <textarea
                className={ this.state.guestlist === "" ? "form-control invalid" : 'form-control' }
                  type='text'
                  id='guestlist'
                  placeholder='List of guest names'
                  value={ this.state.guestlist }
                  onBlur={ this._handleInputChange.bind(this, "guestlist") }
                  onChange={ this._handleInputChange.bind(this, "guestlist") }
                  required />
              </div>
            </div>

            <button
              type="submit"
              onClick={ this._onSubmitForm }
              className="btn btn-success pull-right">
              Create
            </button>
          </form>
        </div>
      );
    }
  });
});