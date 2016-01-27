define([
  'react',
  'react-router'
], function(React, ReactRouter) {
  'use strict';

  return React.createClass({

    _onSubmitForm: function() {

    },

    render: function() {
      return (
        <div className="create-event-form">
          <form onSubmit={ this._onSubmitForm }>
          </form>
        </div>
      );
    }

  });
});