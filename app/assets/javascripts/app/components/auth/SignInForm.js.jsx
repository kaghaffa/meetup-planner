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

    _handleInputChange: function(e) {
      // Get a deep clone of the component's state before the input change.
      var nextState = _.cloneDeep(this.state);

      //Update the state of the component
      nextState[e.target.name] = e.target.value;

      // Update the component's state with the new state
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
        <form>
          <legend>Sign In</legend>
          <input type='email'
            name='email'
            placeholder='email'
            value={ this.state.email }
            onChange={ this._handleInputChange } />
          <input type='password'
            name='password'
            placeholder='password'
            value={ this.state.password }
            onChange={ this._handleInputChange } />
          <input type='submit' onClick={ this._handleSignInClick } defaultValue='login' />
        </form>
      );
    }

  });
});