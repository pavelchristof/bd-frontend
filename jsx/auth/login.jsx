var React = require('react');

var Login = React.createClass({
  propTypes: {
    login: React.PropTypes.string,
    defaultLogin: React.PropTypes.string,
    loginInvalid: React.PropTypes.bool,
    password: React.PropTypes.string,
    defaultPassword: React.PropTypes.string,
    passwordInvalid: React.PropTypes.bool,
    onSubmit: React.PropTypes.func
  },

  render: function() {
    return (
      <form onSubmit={this.props.onSubmit}>
        {this._withValidation(this.props.loginInvalid, [
          <label className="control-label" for="login">User name</label>,
          <input type="text" className="form-control" placeholder="User name"
                 value={this.props.login} defaultValue={this.props.defaultLogin} />
        ])}
        {this._withValidation(this.props.passwordInvalid, [
          <label className="control-label" for="password">Password</label>,
          <input type="password" className="form-control" placeholder="Password"
                 value={this.props.password} defaultValue={this.props.defaultPassword} />
        ])}
        <button type="submit" className="btn btn-default">Login</button>
      </form>
    );
  },

  _withValidation: function(isInvalid, elem) {
    if (isInvalid) {
      return (
        <div className="form-group has-error has-feedback">
          {elem}
          <span className="glyphicon glyphicon-remove form-control-feedback"></span>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          {elem}
        </div>
      );
    }
  },
});

module.exports = Login;
