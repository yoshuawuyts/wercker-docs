/**
 * Module dependencies.
 */

var search = require('@wrk-docs/search');
var slugify = require('slugificate');
var react = require('react');

var db = require('./db.json');

var dom = react.DOM;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'sidebar',
  getDefaultProps: getDefaultProps,
  getInitialState: getInitialState,
  render: render
});

// we manage the state of the object here. source out into search,
// return the result and pass it into the display function.

function getDefaultProps() {
  return {
    data: db
  }
}

/**
 * Get initial state.
 */

function getInitialState() {
  return {
    data: db
  }
}

/**
 * Render.
 */

function render() {
  var state = this.state;

  return dom.aside({className: 'section-sidebar'},
    dom.h2({className: 'sidebar-title'},
      dom.a({href: 'http://wercker.com'} , 'wercker'),
      ' / ',
      dom.span(null, 'docs')
    ),
    search({data: this.props.data, setState: this.setState.bind(this)}),
    dom.section({className: 'sidebar-list'},
      Object.keys(state.data).map(function(key) {
        var val = state.data[key];

        switch (typeof val) {
          case 'string':
            return dom.a({
              className: 'sidebar-li',
              key: val,
              href: '/' + (val == 'index' ? '' : slugify(val))}, val
            )

          default:
            return dom.ul({key: key},
              dom.li({className: 'sidebar-li'},
                dom.a({href: '/' + slugify(key) + '/' + slugify(val[0]) + '.html'}, key)
              ),
              val.map(function(valTwo) {
                return dom.li({className: 'sidebar-li_sub', key: key + valTwo},
                  dom.a({href: '/' + slugify(key) + '/' + slugify(valTwo) + '.html'}, valTwo)
                )
              })
            )
        }
      })
    )
  );
}
