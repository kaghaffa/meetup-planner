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
        nickname: ''
      };
    },

    _handleInputChange: function(field, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = e.target.value;
      this.setState(nextState);
    },

    _onSignUpFormSubmit: function(e) {
      var signUpData = {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
        full_name: this.state.fullName,
        nickname: this.state.nickname
      };
      UserActions.signUp(signUpData);
    },

    render: function() {
      return (
        <form onSubmit={ this._onSignUpFormSubmit }>
          <div className="subtitle">
            <h4>Create an account</h4>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                className="form-control"
                type='text'
                id='fullName'
                placeholder='Joseph Smith'
                value={ this.state.fullName }
                onChange={ this._handleInputChange.bind(this, "fullName") } />
              </div>
            <div className="col-md-6 form-group">
              <label htmlFor="nickname">What should we call you?</label>
              <input
                className="form-control"
                type='text'
                id='nickname'
                placeholder='Joe'
                value={ this.state.nickname }
                onChange={ this._handleInputChange.bind(this, "nickname") } />
            </div>
          </div>


          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type='email'
                id='email'
                placeholder='Email'
                value={ this.state.email}
                onChange={ this._handleInputChange.bind(this, "email") } />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type='password'
                id='password'
                placeholder='Password'
                value={ this.state.password }
                onChange={ this._handleInputChange.bind(this, "password") } />
              </div>

            <div className="col-md-6 form-group">
              <label htmlFor="passwordConfirmation">Password Confirmation</label>
              <input
                className="form-control"
                type='password'
                id='passwordConfirmation'
                placeholder='Confirm password'
                value={ this.state.passwordConfirmation }
                onChange={ this._handleInputChange.bind(this, "passwordConfirmation") } />
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