var $ = require('jquery');
var React = require('react');
var Api = require('./api.jsx');

var Auth = React.createClass({
  propTypes: {
    login: React.PropTypes.string,
    defaultLogin: React.PropTypes.string,
    password: React.PropTypes.string,
    defaultPassword: React.PropTypes.string,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
  },

  render: function() {
    return (
      <form ref="form" action="javascript:void(0);">
        <div className="form-group">
          <label className="control-label" for="login">User name</label>,
          <input type="text" className="form-control"
                 placeholder="User name" name="username"
                 value={this.props.login} defaultValue={this.props.defaultLogin} />
        </div>
        <div className="form-group">
          <label className="control-label" for="password">Password</label>,
          <input type="password" className="form-control"
                 placeholder="Password" name="password"
                 value={this.props.password} defaultValue={this.props.defaultPassword} />
        </div>
        <div className="form-group">
          <button className="btn btn-default"
                  onClick={this._onLogin}>Login</button>
          <button className="btn btn-default"
                  onClick={this._onRegister}>Register</button>
        </div>
      </form>
    );
  },

  _onLogin: function() {
    var data = $(this.refs.form.getDOMNode()).serialize();
    this.props.onLogin(data);
  },

  _onRegister: function() {
    var data = $(this.refs.form.getDOMNode()).serialize();
    this.props.onRegister(data);
  },
});

module.exports = Auth;
