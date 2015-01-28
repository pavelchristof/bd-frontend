var React = require('react');
var Api = require('./api.jsx');
var $ = require('jquery');

var ClassCreator = React.createClass({
  propTypes: {
    onCreate: React.PropTypes.func
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
          <label className="control-label" for="login">Class name</label>,
          <input type="text" className="form-control"
                 placeholder="Class name" name="name" />
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" name="isStruct" /> Is a struct
          </label>
        </div>
        <button className="btn btn-default"
                onClick={this.create}>Create class</button>
      </form>
    );
  },

  create: function() {
    var data = $(this.refs.form.getDOMNode()).serialize();
    Api.post(['classes'], data, function() {
      this.props.onCreate();
    }.bind(this));
  }
});

module.exports = ClassCreator;
