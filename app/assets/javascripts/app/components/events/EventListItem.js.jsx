define([
  'react',
  'react-router',
  'moment'
], function(React, ReactRouter, moment) {

  return React.createClass({

    propTypes: {
      event: React.PropTypes.object.isRequired
    },

    render: function() {
      console.log(this.props.event)
      return (
        <div className="event-list-item well">

          <div className="row">
            <div className="col-md-8">
              <div className="name">{ this.props.event.name }</div>
            </div>
            <div className="col-md-4">
              <div className="dates">
                <span>{ moment(this.props.event.starts).format("MM-DD-YYYY") }</span> - <span>{ moment(this.props.event.ends).format("MM-DD-YYYY") }</span>
              </div>
            </div>
          </div>

          <div className="host">
            Hosted by: <span>{ this.props.event.host }</span>
          </div>

          <div className="row">
            <div className="col-md-6 description">
              { this.props.event.description }
            </div>

            <div className="col-md-6">
              <div className="location">
                { this.props.event.location }
              </div>
            </div>
          </div>
        </div>
      )
    }

  });
});