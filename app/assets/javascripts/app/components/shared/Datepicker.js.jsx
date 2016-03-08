define([
  'react',
  'moment',
  'pikaday'
], function(React, moment, Pikaday ) {
  'use strict';

  return React.createClass({

    propTypes: {
      onBlurHandler: React.PropTypes.func,
      onChangeHandler: React.PropTypes.func,
      onDateSelectHandler: React.PropTypes.func.isRequired,
      value: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      className: React.PropTypes.string
    },

    componentDidMount: function() {
      var _this = this;
      var el = this.getDOMNode();

      this.picker = new Pikaday({
        field: el,
        format: 'YYYY-MM-DD',
        onClose: function(date) {
          _this.props.onDateSelectHandler(this.getMoment().format("YYYY-MM-DD"));
        }
      });
    },

    componentWillUnmount: function() {
      this.picker.destroy();
    },

    render: function() {
      return (
        <input type="text"
               className={ this.props.className || 'form-control' }
               onBlur={this.props.onBlurHandler}
               onChange={this.props.onChangeHandler}
               value={this.props.value}
               placeholder={this.props.placeholder} />
      )
    }
  });
});
