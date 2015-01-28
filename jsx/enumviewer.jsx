var React = require('react');
var Api = require('./api.jsx');

var EnumViewer = React.createClass({
  propTypes: {
    e: React.PropTypes.object,
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
            Enum {this.props.e.type.name} {this.props.e.items.length > 0 ? 'items:' : 'has no items.'}
          </h5>
        </div>
        <ul className="list-group">
          {this.props.e.items.map(i => <li key={i} className="list-group-item">{i}</li>)}
        </ul>
      </div>
    );
  },
});

module.exports = EnumViewer;
