define([
  'react',
  'react-router',
  'app/actions/userActions'
], function(React, ReactRouter, UserActions) {

  return React.createClass({

    _signOut: function() {
      UserActions.signOut();
    },

    render: function() {
      return (
        <button className="btn btn-default" onClick={ this._signOut }>
          Sign out
        </button>
      )
    }

  });
});