var React = require('react');
var Api = require('./api.jsx');

var ClassEditor = React.createClass({
  propTypes: {
    cl: React.PropTypes.object,
    onExit: React.PropTypes.func
  },

  render: function() {
    var button = (
      <button type="button" className="btn btn-default" onClick={this.props.onExit}>
        <span className="glyphicon glyphicon-arrow-left" />
        Return to list
      </button>
    );

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className="pull-right">{button}</span>
          <h5>
            {this.props.cl.isStruct ? 'Struct ' : 'Class '}
            {this.props.cl.type.name}
          </h5>
        </div>
        <ul className="list-group">
        </ul>
      </div>
    );
  },
});

module.exports = ClassEditor;
