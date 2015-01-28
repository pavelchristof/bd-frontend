var React = require('react');
var Api = require('./api.jsx');
var Nav = require('./nav.jsx');
var Auth = require('./auth.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {
      username: null,
      alert: null
    };
  },

  componentDidMount: function() {
    Api.onError = this.setAlert;
    this.fetchUsername();
  },

  render: function() {
    var content;
    if (this.state.username == null) {
      content = <Auth onLogin={this.login} onRegister={this.register} />;
    } else {
      content = null;
    }

    var alert = null;
    if (this.state.alert != null) {
      alert = (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <button type="button" className="close"
                  onClick={this.clearAlert}>&times;</button>
          <strong>Error!</strong> {this.state.alert}
        </div>
      );
    }

    return (
      <div>
        <Nav username={this.state.username}
             onLogout={this.logout} onDelete={this.delete} />
        <div className="container">
          <br />
          {alert}
          {content}
        </div>
      </div>
    );
  },

  setAlert: function(msg) {
    this.setState({ alert: msg });
  },

  clearAlert: function() {
    this.setState({ alert: null });
  },

  setUsername: function(un) {
    this.setState({ username: un });
  },

  clearUsername: function() {
    this.setState({ username: null });
  },

  fetchUsername: function() {
    Api.get(['auth', 'login'], this.setUsername);
  },

  login: function(data) {
    Api.post(['auth', 'login'], data, this.fetchUsername);
  },

  register: function(data) {
    Api.post(['auth', 'register'], data, this.fetchUsername);
  },

  logout: function() {
    Api.post(['auth', 'logout'], {}, this.clearUsername);
  },

  delete: function() {
    bootbox.confirm("Are you sure?", function(result) {
      if (result)
        Api.post(['auth', 'delete'], {}, this.clearUsername);
    }.bind(this));
  }
});

module.exports = App;
