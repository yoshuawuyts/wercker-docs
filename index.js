var learnblocks = require('@docs/learnblocks');
var sidebar = require('@docs/sidebar');
var window = require('global/window');
var nav = require('@docs/nav');
var react = require('react');
var dom = react.DOM;

var learnblocksSelector = document.querySelector('.learn-blocks');
if (learnblocksSelector) react.renderComponent(learnblocks(), learnblocksSelector);

var navSelector = document.querySelector('.nav-sticky');
if (navSelector) react.renderComponent(nav(), navSelector);

var sidebarSelector = document.querySelector('.sidebar');
if (sidebarSelector) react.renderComponent(sidebar()(), sidebarSelector);

var metrics = require('@docs/metrics');
