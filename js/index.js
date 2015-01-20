/** @jsx React.DOM */

var React = require('react');
var MUI = require('material-ui');
var Login = require('./auth/login.js');

var Test = React.createClass({
  render: function() {
    return (
      <Login />
    );
  }
});

window.addEventListener("DOMContentLoaded", function () {
  React.render(<Test />, document.body);
});
