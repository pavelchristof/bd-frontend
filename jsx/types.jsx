var React = require('react');
var Api = require('./api.jsx');
var ClassCreator = require('./classcreator.jsx');
var ClassEditor = require('./classeditor.jsx');
var EnumCreator = require('./enumcreator.jsx');
var EnumViewer = require('./enumviewer.jsx');

var Types = React.createClass({
  getInitialState: function () {
    return {
      classes: [],
      enums: [],
      inherits: [],
      creating: false,
      editing: null
    };
  },

  componentDidMount: function() {
    this.reload();
    Api.reloadsStack.push(this.reload);
  },

  componentWillUnmount: function() {
    Api.reloadsStack.pop();
  },

  reload: function() {
    Api.get(['classes'], this.setClasses);
    Api.get(['enums'], this.setEnums);
    Api.get(['rels', 'inherits'], this.setInherits);
  },

  setClasses: function(data) {
    this.setState({ classes: data });
  },

  setEnums: function(data) {
    this.setState({ enums: data });
  },

  setInherits: function(data) {
    this.setState({ inherits: data });
  },

  setCreating: function(cr) {
    this.setState({ creating: cr });
  },

  clearCreating: function() {
    this.setState({ creating: false });
  },

  setEditing: function(what) {
    this.setState({ editing: what });
  },

  clearEditing: function() {
    this.setState({ editing: null });
  },

  render: function() {
    if (this.state.editing == null) {
      return this.renderList();
    } else if (this.state.editing.what == 'class') {
      var cl = this.state.editing.target;
      return <ClassEditor cl={cl} parents={this.parents(cl.type.name)} onExit={this.clearEditing} />;
    } else if (this.state.editing.what == 'enum') {
      return <EnumViewer e={this.state.editing.target} onExit={this.clearEditing} />;
    }
  },

  renderList: function() {
    var buttons;

    if (this.state.creating === false) {
      buttons = [
        <button type="button" className="btn btn-default"
                onClick={this.setCreating.bind(this, 'class')}>
          <span className="glyphicon glyphicon-plus" /> Create new class
        </button>,
        <button type="button" className="btn btn-default"
                onClick={this.setCreating.bind(this, 'enum')}>
          <span className="glyphicon glyphicon-plus" /> Create new enum
        </button>
      ];
    } else {
      buttons = (
        <button type="button" className="btn btn-default" onClick={this.clearCreating}>
          <span className="glyphicon glyphicon-minus" /> Hide
        </button>
      );
    }

    var wizard = null;
    if (this.state.creating == 'class') {
      wizard = (
        <li key="#classCreator" className="list-group-item well well-lg">
            <ClassCreator onCreate={this.reload} />
        </li>
      );
    } else if (this.state.creating == 'enum') {
      wizard = (
        <li key="#enumCreator" className="list-group-item well well-lg">
            <EnumCreator onCreate={this.reload} />
        </li>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className="pull-right">{buttons}</span>
          <h5>Types</h5>
        </div>
        <ul className="list-group">
          {wizard}
          {this.state.classes.map(this.renderClass)}
          {this.state.enums.map(this.renderEnum)}
        </ul>
      </div>
    );
  },

  renderClass: function(cl) {
    var ed = { what: 'class', target: cl };
    var parents = this.parents(cl.type.name);
    return (
      <li key={cl.type.name} className="list-group-item clearfix">
        <a onClick={this.setEditing.bind(this, ed)}>
          {cl.isStruct ? 'struct ' : 'class '}
          {cl.type.name}
          {parents.length > 0 ? this.renderParents(parents) : null}
        </a>
        <span className="pull-right">
          <button type="button" className="btn btn-default"
                  onClick={this.deleteClass.bind(this, cl)}>
            <span className="glyphicon glyphicon-remove" />
            Delete
          </button>
        </span>
      </li>
    );
  },

  renderParents: function(p) {
    return (
      <span>
        &nbsp;: {p.join(', ')}
      </span>
    );
  },

  renderEnum: function(e) {
    var ed = { what: 'enum', target: e };
    return (
      <li key={e.type.name} className="list-group-item clearfix">
      <a onClick={this.setEditing.bind(this, ed)}>
        enum {e.type.name}
      </a>
      <span className="pull-right">
        <button type="button" className="btn btn-default"
                onClick={this.deleteEnum.bind(this, e)}>
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
  },

  deleteEnum: function(e) {
    bootbox.confirm("Are you sure?", function(ans) {
      if (ans)
        Api.delete(['enums', e.type.name], this.reload);
    }.bind(this));
  },

  parents: function(of) {
    var p = [];
    this.state.inherits.forEach(i => {
      if (i[0] == of) {
        p.push(i[1]);
      }
    });
    return p;
  }
});

module.exports = Types;
