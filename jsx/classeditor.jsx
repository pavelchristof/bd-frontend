var React = require('react');
var Api = require('./api.jsx');
var MultiInput = require('./multiinput.jsx');

var ClassEditor = React.createClass({
  propTypes: {
    cl: React.PropTypes.object,
    parents: React.PropTypes.array,
    onExit: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      fields: [],
      methods: [],

      selectedField: null,
      readers: [],
      writers: [],

      selectedMethod: null,

      creatingField: false,
      creatingMethod: false
    };
  },

  setFields: function(f) {
    this.setState({ fields: f });
  },

  setMethods: function(m) {
    this.setState({ methods: m });
  },

  setReaders: function(data) {
    this.setState({ readers: data });
  },

  setWriters: function(data) {
    this.setState({ writers: data });
  },

  switchCreatingField: function() {
    this.setState({ creatingField: !this.state.creatingField });
  },

  switchCreatingMethod: function() {
    this.setState({ creatingMethod: !this.state.creatingMethod });
  },

  componentDidMount: function() {
    this.reload();
    Api.reloadsStack.push(this.reload);
  },

  componentWillUnmount: function() {
    Api.reloadsStack.pop();
  },

  switchSelectedField: function(val) {
    if (this.state.selectedField == val) {
      this.setState({ selectedField: null, readers: [], writers: [] });
    } else {
      this.setState({ selectedField: val });
      Api.get(['classes', this.props.cl.type.name, 'fields', val, 'readers'], this.setReaders);
      Api.get(['classes', this.props.cl.type.name, 'fields', val, 'writers'], this.setWriters);
    }
  },

  switchSelectedMethod: function(val) {
    if (this.state.selectedMethod == val) {
      this.setState({ selectedMethod: null });
    } else {
      this.setState({ selectedMethod: val });
    }
  },

  reload: function() {
    Api.get(['classes', this.props.cl.type.name, 'fields'], this.setFields);
    Api.get(['classes', this.props.cl.type.name, 'methods'], this.setMethods);

    var val = this.state.selectedField;
    if (val != null) {
      Api.get(['classes', this.props.cl.type.name, 'fields', val, 'readers'], this.setReaders);
      Api.get(['classes', this.props.cl.type.name, 'fields', val, 'writers'], this.setWriters);
    }
  },

  render: function() {
    var button = (
      <button type="button" className="btn btn-default" onClick={this.props.onExit}>
        <span className="glyphicon glyphicon-arrow-left" />
        Return to list
      </button>
    );

    return (<div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className="pull-right">{button}</span>
          <h5>
            {this.props.cl.isStruct ? 'Struct ' : 'Class '}
            {this.props.cl.type.name}.
            {this.props.cl.type.decl.file != null ? ' Declared at ' + this.props.cl.type.decl.file + '.' : null}
            {this.props.parents.length > 0 ? (' Inherits ' + this.props.parents.join(', ') + '.') : null}
          </h5>
        </div>
      </div>
      {this.renderFields()}
      {this.renderMethods()}
    </div>);
  },

  renderFields: function() {
    var button;
    if (this.state.creatingField) {
      button = (
        <button type="button" className="btn btn-default" onClick={this.switchCreatingField}>
          <span className="glyphicon glyphicon-minus" /> Hide
        </button>
      );
    } else {
      button = (
        <button type="button" className="btn btn-default"
                onClick={this.switchCreatingField}>
          <span className="glyphicon glyphicon-plus" /> Create new field
        </button>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className="pull-right">{button}</span>
          <h5>Fields</h5>
        </div>
        <ul className="list-group">
          {this.state.creatingField ? this.renderFieldForm() : null}
          {this.state.fields.map(this.renderField)}
        </ul>
      </div>
    );
  },

  renderField: function(f) {
    var rw = null;
    if (this.state.selectedField == f.value.ident) {
      rw = (
        <div>
          Readers
          <ul>
            { this.state.readers.map(r => <li key={r}>{r}</li>) }
          </ul>
          Writers
          <ul>
            { this.state.writers.map(w => <li key={w}>{w}</li>) }
          </ul>
        </div>
      );
    }

    return (
      <li className="list-group-item" key={f.value.ident}>
        <a onClick={this.switchSelectedField.bind(this, f.value.ident)}>
          {f.static ? <em>static </em> : null}
          <span style={{color: 'blue'}}>{f.type} </span>
          <strong>{f.value.ident}</strong>
        </a>
        {rw}
      </li>
    );
  },

  renderFieldForm: function() {
    return (<li key="#fieldForm" className="list-group-item well well-lg">
      <form ref="fieldForm" action="javascript:void(0);">
        <div className="form-group">
          <label className="control-label" for="login">File name (optional)</label>,
          <input type="text" className="form-control"
                 placeholder="File name" name="file" />
        </div>
        <div className="form-group">
          <label className="control-label" for="login">Field name</label>,
          <input type="text" className="form-control"
                 placeholder="Field name" name="ident" />
        </div>
        <div className="form-group">
          <label className="control-label" for="login">Field type</label>,
          <input type="text" className="form-control"
                 placeholder="Field type" name="type" />
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" name="static" /> static
          </label>
        </div>
        <button className="btn btn-default"
                onClick={this.createField}>Create field</button>
      </form>
    </li>);
  },

  renderMethods: function() {
    var button;
    if (this.state.creatingMethod) {
      button = (
        <button type="button" className="btn btn-default" onClick={this.switchCreatingMethod}>
          <span className="glyphicon glyphicon-minus" /> Hide
        </button>
      );
    } else {
      button = (
        <button type="button" className="btn btn-default"
                onClick={this.switchCreatingMethod}>
          <span className="glyphicon glyphicon-plus" /> Create new method
        </button>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className="pull-right">{button}</span>
          <h5>Methods</h5>
        </div>
        <ul className="list-group">
          {this.state.creatingMethod ? this.renderMethodForm() : null}
          {this.state.methods.map(this.renderMethod)}
        </ul>
      </div>
    );
  },

  renderMethod: function(m) {
    return (
      <li className="list-group-item" key={m.id}>
        <span className="pull-right">
          Id: {m.id}
        </span>
        <a onClick={this.switchSelectedMethod.bind(this, m.id)}>
          {m.static ? <em>static </em> : null}
          <span style={{color: 'blue'}}>{m.returnType} </span>
          <strong>{m.value.ident}</strong>
          ( {m.argTypes.join(', ')} )
        </a>
      </li>
    );
  },

  renderMethodForm: function() {
    return (
    <li key="#methodForm" className="list-group-item well well-lg">
      <form ref="methodForm" action="javascript:void(0);">
        <div className="form-group">
          <label className="control-label" for="login">File name (optional)</label>,
          <input type="text" className="form-control"
                 placeholder="File name" name="file" />
        </div>
        <div className="form-group">
          <label className="control-label" for="login">Method name</label>,
          <input type="text" className="form-control"
                 placeholder="Method name" name="ident" />
        </div>
        <div className="form-group">
          <label className="control-label" for="login">Return type</label>,
          <input type="text" className="form-control"
                 placeholder="Method type" name="returnType" />
        </div>
        <div className="form-group">
          <label>Argument types</label>
          <MultiInput type="text" className="form-control" placeholder="Argument type" name="argTypes" />
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" name="static" /> static
          </label>
        </div>
        <button className="btn btn-default"
                onClick={this.createMethod}>Create method</button>
      </form>
    </li>);
  },

  createField: function() {
    var data = $(this.refs.fieldForm.getDOMNode()).serialize();
    Api.post(['classes', this.props.cl.type.name, 'fields'], data, this.reload);
  },

  createMethod: function() {
    var data = $(this.refs.methodForm.getDOMNode()).serialize();
    Api.post(['classes', this.props.cl.type.name, 'methods'], data, this.reload);
  }
});

module.exports = ClassEditor;
