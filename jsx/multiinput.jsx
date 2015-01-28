var React = require('react');

var MultiInput = React.createClass({
  getInitialState: function() {
    return {
      fields: []
    };
  },

  render: function() {
    var button = (
      <button type="button" className="btn btn-default"
              onClick={this.newField}>
        <span className="glyphicon glyphicon-plus" />
      </button>
    );

    return (
      <span>
        <span className="pull-right">{button}</span>
        <ul>
          {this.state.fields.map(f => <ul>{f}</ul>)}
        </ul>
      </span>
    );
  },

  newField: function() {
    var nfields = this.state.fields;
    nfields.push(
      <input {...this.props} />
    );
    this.setState({
      fields: nfields
    });
  }
});

module.exports = MultiInput;
