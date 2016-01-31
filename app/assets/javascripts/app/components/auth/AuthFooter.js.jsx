define([
  'react',
  'react-router',
  'app/components/auth/SignInForm',
  'app/components/auth/SignOutButton',
  'app/components/auth/SignUpForm',
  'app/actions/userActions'
], function(React, ReactRouter, SignInForm, SignOutButton, SignUpForm, UserActions) {

  return React.createClass({

    propTypes: {
      showSignUpForm: React.PropTypes.bool.isRequired,
      onToggleFormClick: React.PropTypes.func.isRequired
    },

    render: function() {
      var content;
      if (this.props.showSignUpForm) {
        content = (
          <p>
            Already a user? <a href="#" onClick={ this.props.onToggleFormClick }>
              Sign in
            </a>
          </p>
        );
      } else {
        content = (
          <p>
            Not a user yet? <a href="#" onClick={ this.props.onToggleFormClick }>
              Create an acount
            </a>
          </p>
        );
      }

      return (
        <div className="auth-footer">
          { content }
        </div>
      )
    }

  });
});