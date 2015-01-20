var React = require('react');
var MUI = require('material-ui');

var Login = React.createClass({
  render: function() {
    return (
      <MUI.Paper zDepth={1} className="center">
        <form>
          <MUI.Input name="login" placeholder="Login" type="text" />
        </form>
      </MUI.Paper>
    );
  }
});

module.exports = Login;
