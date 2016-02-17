define([
  'react',
  'react-router'
], function(React, ReactRouter) {

  return React.createClass({

    propTypes: {
      event: React.PropTypes.object.isRequired
    },

    render: function() {
      console.log(this.props.event)
      return (
        <div className="event-list-item">
          { this.props.event }
        </div>
      )
    }

  });
});