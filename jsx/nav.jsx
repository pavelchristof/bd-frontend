var React = require('react');

var Nav = React.createClass({
  propTypes: {
    username: React.PropTypes.string,
    onLogout: React.PropTypes.func,
    onDelete: React.PropTypes.func
  },

  render: function() {
    var content;
    if (this.props.username == null) {
      content = (
        <li className="navbar-text">Not logged in.</li>
      );
    } else {
      content = [
        <li className="navbar-text">Logged in as {this.props.username}.</li>,
        <li className="btn-group" role="group">
          <button className="btn btn-default navbar-btn"
                  onClick={this.props.onLogout}>Logout</button>
          <button className="btn btn-default navbar-btn"
                  onClick={this.props.onDelete}>Delete account</button>
        </li>
      ];
    }

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">Databases</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {content}
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
