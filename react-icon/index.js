/**
 * Module dependencies
 */

var react = require('react');
var dom = react.DOM;

/**
 * Create button class
 */

module.exports = react.createClass({
  displayName: 'icon',
  propTypes: {
    children: react.PropTypes.string.isRequired,
    className: react.PropTypes.string,
    onClick: react.PropTypes.func,
    key: react.PropTypes.string
  },
  render: render
});

/**
 * Render.
 */

function render() {
  return dom.span({
    className: 'icon ' + this.props.className,
    dangerouslySetInnerHTML: {__html: this.props.children},
    onClick: this.props.onClick,
    key: this.props.key
  });
}
