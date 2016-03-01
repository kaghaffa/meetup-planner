define([
  'react',
  'react-router',
  'app/actions/userActions'
], function(React, ReactRouter, UserActions) {

  return React.createClass({

    getInitialState: function() {
      return {
        email: '',
        password: '',
        passwordConfirmation: '',
        fullName: '',
        nickname: '',
        errors: []
      };
    },

    componentDidMount: function() {
      this.refs.fullName.getDOMNode().focus();
    },

    _handleInputChange: function(field, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = e.target.value;
      this.setState(nextState);
    },

    _onSignUpFormSubmit: function(e) {
      e.preventDefault();

      this._validate_form();
      if (this.state.errors.length > 0) return;

      var signUpData = {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
        full_name: this.state.fullName,
        nickname: this.state.nickname
      };

      this._validate_form(function() {
        if (this.state.errors.length == 0) {
          UserActions.signUp(signUpData);
        }
      });
    },

    _validate_form: function(callback) {
      var errors = [];

      if (this.state.password.length > 0) {
        if (this.state.password.length < 8) {
          errors.push("Password must be at least 8 characters");
        }

        if (!this.state.password.match(/(?=.*\d)./) && !this.state.password.match(/(?=.*[A-Z])./)) {
          errors.push("Password must have at least one number or uppercase letter");
        }

        if (this.state.passwordConfirmation.length > 0) {
          if (this.state.password !== this.state.passwordConfirmation) {
            errors.push("Passwords don't match");
          }
        }
      }

      if (typeof(callback) === 'function') {
        this.setState({errors: errors}, callback);
      } else {
        this.setState({errors: errors});
      }
    },

    render: function() {
      var errorAlert;
      if (!_.isEmpty(this.state.errors)) {
        var errorList = this.state.errors.map(function(error) {
          return <li>{ error }</li>;
        })

        errorAlert = (
          <div className="alert alert-danger" role="alert">
            <ul>{ errorList }</ul>
          </div>
        );
      }

      return (
        <form className="" onSubmit={ this._onSignUpFormSubmit }>
          <div className="subtitle">
            <h4>Create an account</h4>
          </div>
          { errorAlert }
          <div className="row">
            <div className="col-md-6 col-sm-6 form-group">
              <label htmlFor="fullName">Full name *</label>
              <input
                className="form-control"
                type='text'
                id='fullName'
                ref="fullName"
                placeholder='Joseph Smith'
                autoComplete="name"
                value={ this.state.fullName }
                onChange={ this._handleInputChange.bind(this, "fullName") }
                required />
              </div>
            <div className="col-md-6 col-sm-6 form-group">
              <label htmlFor="nickname">What should we call you?</label>
              <input
                className="form-control"
                type='text'
                id='nickname'
                placeholder='Joe'
                autoComplete="given-name"
                value={ this.state.nickname }
                onChange={ this._handleInputChange.bind(this, "nickname") } />
            </div>
          </div>


          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="email">Email *</label>
              <input
                className="form-control"
                type='email'
                id='email'
                placeholder='joe@smith.com'
                autoComplete="email"
                value={ this.state.email }
                onChange={ this._handleInputChange.bind(this, "email") }
                required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6 form-group">
              <label htmlFor="password">Password *</label>
              <input
                className="form-control"
                type='password'
                id='password'
                placeholder='At least 8 characters with at least 1 uppercase or number'
                value={ this.state.password }
                minlength="8"
                onChange={ this._handleInputChange.bind(this, "password") }
                onBlur={ this._validate_form }
                required />
              </div>

            <div className="col-md-6 col-sm-6 form-group">
              <label htmlFor="passwordConfirmation">Password Confirmation *</label>
              <input
                className="form-control"
                type='password'
                id='passwordConfirmation'
                placeholder='Confirm password'
                value={ this.state.passwordConfirmation }
                onChange={ this._handleInputChange.bind(this, "passwordConfirmation") }
                onBlur={ this._validate_form }
                required />
              </div>
            </div>

            <button type="submit" className="btn btn-success pull-right">
              Sign Up
            </button>
        </form>
      );
    }
  });
});