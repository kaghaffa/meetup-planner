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
        password_confirmation: '',
        name: ''
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

    _handleRegistrationClick: function(e) {
      var signUpData = {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        full_name: this.state.name
      };
      UserActions.signUp(signUpData);
    },

    render:function(){
      return (
        <form>
          <input type='text'
            name='name'
            placeholder='name'
            value={ this.state.name }
            onChange={ this._handleInputChange } />

          <input type='email'
            name='email'
            placeholder='email'
            value={ this.state.email} s
            onChange={ this._handleInputChange } />

          <input type='password'
            name='password'
            placeholder='password'
            value={ this.state.password }
            onChange={ this._handleInputChange } />

          <input type='password'
            name='password_confirmation'
            placeholder='re-type password'
            value={ this.state.password_confirmation }
            onChange={ this._handleInputChange } />
          <input onClick={ this._handleRegistrationClick } defaultValue="sign up"/>
        </form>
      );
    }
  });
});