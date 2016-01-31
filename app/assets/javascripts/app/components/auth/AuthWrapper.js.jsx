define([
  'react',
  'react-router',
  'app/components/auth/AuthFooter',
  'app/components/auth/SignInForm',
  'app/components/auth/SignOutButton',
  'app/components/auth/SignUpForm',
  'app/actions/userActions'
], function(React, ReactRouter, AuthFooter, SignInForm, SignOutButton, SignUpForm, UserActions) {

  return React.createClass({

    getInitialState: function() {
      return {
        showSignUpForm: true
      };
    },

    _onToggleFormClick: function() {
      this.setState({
        showSignUpForm: !this.state.showSignUpForm
      });
    },

    render: function() {
      var content = this.state.showSignUpForm ? <SignUpForm /> : <SignInForm />

      return (
        <div className="well well-lg col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 auth-wrapper">
          <h1>hello</h1>
          { content }
          <AuthFooter
            showSignUpForm={ this.state.showSignUpForm }
            onToggleFormClick={ this._onToggleFormClick }
          />
        </div>
      )
    },

  });
});