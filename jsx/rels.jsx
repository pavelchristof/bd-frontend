var React = require('react');
var Api = require('./api.jsx');

var Rels = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h5>Create relations</h5>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <form ref="inherits" className="form-inline" action="javascript:void(0);">
              <div className="form-group">
                <label for="inherits-who">Child name</label>
                <input type="text" className="form-control" id="inherits-who" name="who" placeholder="Child name" />
              </div>
              <div className="form-group">
                <label for="inherits-whom">Parent name</label>
                <input type="text" className="form-control" id="inherits-whom" name="whom" placeholder="Parent name" />
              </div>
              <button type="submit" className="btn btn-default"
                      onClick={this.createInherits}>Inherits</button>
            </form>
          </li>
          <li className="list-group-item">
            <form ref="calls" className="form-inline" action="javascript:void(0);">
              <div className="form-group">
                <label for="calls-who">Caller id</label>
                <input type="text" className="form-control" id="calls-who" name="who" placeholder="Caller id" />
              </div>
              <div className="form-group">
                <label for="calls-whom">Callee id</label>
                <input type="text" className="form-control" id="calls-whom" name="whom" placeholder="Callee id" />
              </div>
              <button type="submit" className="btn btn-default"
                      onClick={this.createCalls}>Calls</button>
            </form>
          </li>
          <li className="list-group-item">
            <form ref="reads" className="form-inline" action="javascript:void(0);">
              <div className="form-group">
                <label for="reads-who">Reader method id</label>
                <input type="text" className="form-control" id="reads-who" name="who" placeholder="Reader method id" />
              </div>
              <div className="form-group">
                <label for="reads-whom-class">Field class name</label>
                <input type="text" className="form-control" id="reads-whom-class" name="whomClass" placeholder="Field class name" />
              </div>
              <div className="form-group">
                <label for="reads-whom-ident">Field name</label>
                <input type="text" className="form-control" id="reads-whom-ident" name="whomField" placeholder="Field name" />
              </div>
              <button type="submit" className="btn btn-default"
                      onClick={this.createReads}>Reads</button>
            </form>
          </li>
          <li className="list-group-item">
            <form ref="writes" className="form-inline" action="javascript:void(0);">
              <div className="form-group">
                <label for="writes-who">Writer method id</label>
                <input type="text" className="form-control" id="writes-who" name="who" placeholder="Writer method id" />
              </div>
              <div className="form-group">
                <label for="writes-whom-class">Field class name</label>
                <input type="text" className="form-control" id="writes-whom-class" name="whomClass" placeholder="Field class name" />
              </div>
              <div className="form-group">
                <label for="writes-whom-ident">Field name</label>
                <input type="text" className="form-control" id="writes-whom-ident" name="whomField" placeholder="Field name" />
              </div>
              <button type="submit" className="btn btn-default"
                      onClick={this.createWrites}>Writes</button>
            </form>
          </li>
        </ul>
      </div>
    );
  },

  createInherits: function() {
    var data = $(this.refs.inherits.getDOMNode()).serialize();
    Api.post(['rels', 'inherits'], data, Api.forceReload.bind(Api));
  },

  createCalls: function() {
    var data = $(this.refs.calls.getDOMNode()).serialize();
    Api.post(['rels', 'calls'], data, Api.forceReload.bind(Api));
  },

  createReads: function() {
    var data = $(this.refs.reads.getDOMNode()).serialize();
    Api.post(['rels', 'reads'], data, Api.forceReload.bind(Api));
  },

  createWrites: function() {
    var data = $(this.refs.writes.getDOMNode()).serialize();
    Api.post(['rels', 'writes'], data, Api.forceReload.bind(Api));
  }
});

module.exports = Rels;
