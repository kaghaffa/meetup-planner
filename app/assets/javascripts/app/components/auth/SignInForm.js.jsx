define([
  'react',
  'react-router',
  'app/actions/userActions'
], function(React, ReactRouter, UserActions) {

  return React.createClass({

    getInitialState: function() {
      return {
        email: '',
        password: ''
      };
    },

    _handleInputChange: function(field, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = e.target.value;
      this.setState(nextState);
    },

    _handleSignInClick: function(e) {
      var signInData = {
        email: this.state.email,
        password: this.state.password
      };

      UserActions.signIn(signInData);
    },

    render: function() {
      return (
        <form onSubmit={ this._handleSignInClick }>
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type='email'
                id='email'
                placeholder='email'
                value={ this.state.email }
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
                  placeholder='password'
                  value={ this.state.password }
                  onChange={ this._handleInputChange.bind(this, "password") } />
            </div>
          </div>
          <button type='submit' className="btn btn-success pull-right" >
            Sign In
          </button>
        </form>
      );
    }

  });
});