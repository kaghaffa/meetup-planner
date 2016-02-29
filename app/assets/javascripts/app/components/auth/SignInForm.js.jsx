define([
  'react',
  'react-router',
  'app/actions/userActions'
], function(React, ReactRouter, UserActions) {

  return React.createClass({

    mixins: [ReactRouter.Navigation],

    getInitialState: function() {
      return {
        email: '',
        password: '',
        errorText: ''
      };
    },

    componentDidMount: function() {
      this.refs.email.getDOMNode().focus();
    },

    _handleInputChange: function(field, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[field] = e.target.value;
      this.setState(nextState);
    },

    _handleSignInClick: function() {
      var _this = this;
      var signInData = {
        email: this.state.email,
        password: this.state.password
      };

      UserActions.signIn(signInData, function(data) {
        if (data.status > 299) {
          _this.setState({
            errorText: data.responseJSON.error
          });
        }
      });
    },

    render: function() {
      var errorAlert;
      if (this.state.errorText) {
        errorAlert = (
          <div className="alert alert-danger" role="alert">{ this.state.errorText }</div>
        );
      }

      return (
        <form onSubmit={ this._handleSignInClick }>
          <div className="subtitle">
            <h4>Sign in</h4>
          </div>
          { errorAlert }
          <div className="row">
            <div className="col-md-8 col-md-offset-2 form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type='email'
                id='email'
                ref='email'
                placeholder='john@smith.com'
                value={ this.state.email }
                onChange={ this._handleInputChange.bind(this, "email") } />
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 col-md-offset-2 form-group">
              <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type='password'
                  id='password'
                  placeholder='&#9679;&#9679;&#9679;'
                  value={ this.state.password }
                  onChange={ this._handleInputChange.bind(this, "password") } />
            </div>
          </div>
          <button type='submit' className="btn btn-success pull-right" >
            Sign In
          </button>
        </form>
      );
    }

  });
});