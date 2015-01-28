var React = require('react');
var Api = require('./api.jsx');
var ClassCreator = require('./classcreator.jsx');
var ClassEditor = require('./classeditor.jsx');

var Types = React.createClass({
  getInitialState: function () {
    return {
      classes: [],
      selected: null,
      creating: false,
      editing: null
    };
  },

  componentDidMount: function() {
    this.reload();
  },

  reload: function() {
    Api.get(['classes'], this.setClasses);
  },

  setClasses: function(data) {
    this.setState({ classes: data });
  },

  switchCreating: function() {
    this.setState({ creating: !this.state.creating });
  },

  setEditing: function(cl) {
    this.setState({ editing: cl });
  },

  clearEditing: function() {
    this.setState({ editing: null });
  },

  render: function() {
    if (this.state.editing == null) {
      return this.renderList();
    } else {
      return <ClassEditor cl={this.state.editing} onExit={this.clearEditing} />;
    }
  },

  renderList: function() {
    var iconClass = 'glyphicon glyphicon-' + (this.state.creating ? 'minus' : 'plus');
    var button = (
      <button type="button" className="btn btn-default" onClick={this.switchCreating}>
        <span className={iconClass} />
        {this.state.creating ? 'Hide' : 'Create new class'}
      </button>
    );

    var wizard = null;
    if (this.state.creating) {
      wizard = (
        <li className="list-group-item well well-lg">
            <ClassCreator onCreate={this.reload} />
        </li>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className="pull-right">{button}</span>
          <h5>Classes</h5>
        </div>
        <ul className="list-group">
          {wizard}
          {this.state.classes.map(this.renderClass)}
        </ul>
      </div>
    );
  },

  renderClass: function(cl) {
    return (
      <li key={cl.type.name} className="list-group-item">
        <a onClick={this.setEditing.bind(this, cl)}>
          {cl.isStruct ? 'struct ' : 'class '}
          {cl.type.name}
        </a>
        <span className="pull-right">
          <button type="button" class="btn btn-default"
                  onClick={this.deleteClass.bind(this, cl)}>
            <span className="glyphicon glyphicon-remove" />
            Delete
          </button>
        </span>
      </li>
    );
  },

  deleteClass: function(cl) {
    bootbox.confirm("Are you sure?", function(ans) {
      if (ans)
        Api.delete(['classes', cl.type.name], this.reload);
    }.bind(this));
  }
});

module.exports = Types;
