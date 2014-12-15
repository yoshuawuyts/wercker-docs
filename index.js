/*global document*/

/**
 * Module dependencies
 */

var sidebar = require('@wrk-docs/sidebar');
var react = require('react');
var dom = react.DOM;

/**
 * Create stuff
 */

react.renderComponent(sidebar(), document.querySelector('.sidebar'));
