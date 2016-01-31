define([
  'react',
  'react-router',
], function(React, ReactRouter) {

  return React.createClass({

    mixins: [ReactRouter.Navigation],

    _onSignInClick: function() {
      this.transitionTo('/');
    },

    render: function() {
      return (
        <button className="btn btn-default" onClick={ this._onSignInClick }>
          Sign In
        </button>
      );
    }

  });
});