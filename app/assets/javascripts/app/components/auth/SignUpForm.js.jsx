define([
  'react',
  'react-router',
  'app/actions/userActions'
], function(React, ReactRouter, UserActions) {

  return React.createClass({

    getInitialState: function() {
      return {
        email: null,
        password: null,
        passwordConfirmation: null,
        fullName: null,
        nickname: null,
        errors: [],
        jobTitle: null,
        employer: null
      };
    },

    componentDidMount: function() {
      this.refs.fullName.getDOMNode().focus();

      // Remove bubble validation
      var forms = document.getElementsByTagName('form');
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('invalid', function(e) {
          e.preventDefault();
        }, true);
      }
    },

    _handleInputChange: function(field, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = e.target.value;
      this.setState(nextState);
    },

    _onSignUpFormSubmit: function(e) {
      e.preventDefault();

      var nextState = _.cloneDeep(this.state);
      for (var field in nextState) {
        if (nextState[field] === null) {
          nextState[field] = '';
        }
      };
      this.setState(nextState);

      this._validate_form(function() {
        if (this.state.errors.length || document.getElementsByClassName('invalid').length) {
          return;
        }

        var signUpData = {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation,
          full_name: this.state.fullName,
          nickname: this.state.nickname,
          job_title: this.state.jobTitle,
          employer: this.state.employer
        };

        if (this.state.errors.length == 0) {
          UserActions.signUp(signUpData);
        }
      });
    },

    _validate_form: function(callback) {
      var errors = [];

      if (this.state.password) {
        if (this.state.password.length < 8) {
          errors.push("Password must be at least 8 characters");
        }

        if (!this.state.password.match(/(?=.*\d)./) && !this.state.password.match(/(?=.*[A-Z])./)) {
          errors.push("Password must have at least one number or uppercase letter");
        }

        if (this.state.passwordConfirmation) {
          if (this.state.password !== this.state.passwordConfirmation) {
            errors.push("Passwords don't match");
          }
        }
      }

      if (this.state.email) {
        if (!this.state.email.match(/\S+@\S+\.\S+/)) {
          errors.push("Invalid email");
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
        <form ref="sign-up-form">
          <div className="subtitle">
            <h4>Create an account</h4>
          </div>
          { errorAlert }
          <div className="row">
            <div className="col-md-6 col-sm-6 form-group">
              <label htmlFor="full-name">Full name *</label>
              <input
                className={ this.state.fullName === "" ? "form-control invalid" : 'form-control' }
                type='text'
                id='full-name'
                ref="fullName"
                placeholder='Joseph Smith'
                autoComplete="name"
                onBlur={ this._handleInputChange.bind(this, "fullName") }
                value={ this.state.fullName }
                onChange={ this._handleInputChange.bind(this, "fullName") }
                required />
              </div>
            <div className="col-md-6 col-sm-6 form-group">
              <label htmlFor="nickname">What should we call you? (optional)</label>
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
                className={ this.state.email === "" ? "form-control invalid" : 'form-control' }
                type='email'
                id='email'
                placeholder='joe@smith.com'
                autoComplete="email"
                onBlur={ this._validate_form }
                value={ this.state.email }
                onChange={ this._handleInputChange.bind(this, "email") }
                required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6 form-group">
              <label htmlFor="password">Password *</label>
              <input
                className={ this.state.password === "" ? "form-control invalid" : 'form-control' }
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
              <label htmlFor="password-confirmation">Password Confirmation *</label>
              <input
                className={ this.state.passwordConfirmation === "" ? "form-control invalid" : 'form-control' }
                type='password'
                id='password-confirmation'
                placeholder='Confirm password'
                value={ this.state.passwordConfirmation }
                onChange={ this._handleInputChange.bind(this, "passwordConfirmation") }
                onBlur={ this._validate_form }
                required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6 form-group">
              <label htmlFor="employer">Employer (optional)</label>
              <input
                className="form-control"
                type='text'
                id='employer'
                placeholder='Company name'
                value={ this.state.employer }
                onChange={ this._handleInputChange.bind(this, "employer") } />
            </div>

            <div className="col-md-6 col-sm-6 form-group">
              <label htmlFor="job-title">Job Title (optional)</label>
              <input
                className="form-control"
                type='text'
                id='job-title'
                placeholder='Engineer, accountant, etc'
                value={ this.state.jobTitle }
                onChange={ this._handleInputChange.bind(this, "jobTitle") } />
            </div>
          </div>

          <button
            type="submit"
            onClick={ this._onSignUpFormSubmit }
            className="btn btn-success pull-right">
            Sign Up
          </button>
        </form>
      );
    }
  });
});