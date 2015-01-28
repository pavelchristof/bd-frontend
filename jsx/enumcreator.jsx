var React = require('react');
var Api = require('./api.jsx');
var $ = require('jquery');
var MultiInput = require('./multiinput.jsx');

var EnumCreator = React.createClass({
  propTypes: {
    onCreate: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      items: []
    };
  },

  render: function() {
    return (
      <form ref="form" action="javascript:void(0);">
        <div className="form-group">
          <label className="control-label" for="login">File name (optional)</label>,
          <input type="text" className="form-control"
                 placeholder="File name" name="file" />
        </div>
        <div className="form-group">
          <label className="control-label" for="login">Enum name</label>,
          <input type="text" className="form-control"
                 placeholder="Enum name" name="name" />
        </div>
        <div>
          <label>Items</label>
          <MultiInput type="text" className="form-control" name="items" placeholder="Enum item" />
        </div>
        <button className="btn btn-default"
                onClick={this.create}>Create enum</button>
      </form>
    );
  },

  create: function() {
    var data = $(this.refs.form.getDOMNode()).serialize();
    Api.post(['enums'], data, function() {
      this.props.onCreate();
    }.bind(this));
  }
});

module.exports = EnumCreator;
