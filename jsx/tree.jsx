var React = require('react/addons');;

var listOf = elems =>
  <ul className="list-group">
    {elems.map(elem => <li className="list-group-item">{elem}</li>)}
  </ul>;

var TreeNode = React.createClass({
  getInitialState: function() {
    return {
      collapsed: false
    };
  },

  switchCollapsed: function() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  render: function() {
    var glyphClass = React.addons.classSet({
      'glyphicon': true,
      'glyphicon-collapse-down': this.state.collapsed,
      'glyphicon-collapse-up': !this.state.collapsed
    });
    var nodes = null;

    if (!this.state.collapsed) {
      var children = this.props.children || [];
      nodes = listOf(this.props.children.map(child =>
        <TreeNode key={child.text} {...child} />
      ));
    }

    return (
      <div>
        <span>
          { this.props.children.length > 0
            ? <span className={glyphClass} onClick={this.switchCollapsed} />
            : null
          }
          <span onClick={this.props.onClick}>{this.props.text}</span>
        </span>
        {nodes}
      </div>
    );
  }
});

var Tree = React.createClass({
  propTypes: {
    roots: React.PropTypes.array
  },

  render: function() {
    var children = this.props.children || [];
    var nodes = children.map(child => <TreeNode key={child.text} {...child} />);
    return listOf(nodes);
  }
});

module.exports = Tree;
