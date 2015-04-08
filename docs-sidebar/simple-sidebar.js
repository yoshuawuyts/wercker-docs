
var window    = require('global/window');
var slugify   = require('slugificate');
var react     = require('react');

var dom = react.DOM;

module.exports = simpleSidebar

function simpleSidebar(props, state) {
  var lesson = getLesson();
  var lessonData = state.data[lesson];

  return dom.section({className: 'section-sidebar section-learn section-sidebar_' + lesson},
    dom.section({className: 'sidebar-list'},
      dom.ul(null,
        lessonData.map(function(val) {
          return dom.li({className: 'sidebar-li_sub' + activeClass(val), key: val},
            dom.a({
              href: createHref(stripUrl(), lesson, val)
            }, stripFileName(val))
          )
        })
      )
    )
  )
}

/**
 * Sets active className.
 *
 * @param {String} val
 */
function activeClass(val) {
  const head = window.location.pathname.split('/')[3].split('.')[0];
  const active = (head == slugify(val.split('.')[0]));
  return (active ? ' active' : '');
}

/**
 * Cleans up the file name
 *
 * @param {String} val
 */
function stripFileName(val) {
  var name = val.replace(/([-])/g, ' ');
  return name.split('.')[0].split('_')[1];
}

/**
 * Get the current url and only get the
 * base path.
 */
function stripUrl() {
  var pathName = window.location.pathname.match(/\/\w+\//)[0];
  return pathName.split('/')[1];
}

/**
 * Get the lesson from a url.
 */
function getLesson() {
  var pathArr = window.location.pathname.split('/')[2];
  return pathArr.split('.')[0];
}

/**
 * Create the link used for the menu.
 * @param {String} base
 * @param {String} lesson
 * @param {String[]} val
 */
function createHref(base, lesson, val) {
  return '/'
    + base
    + '/'
    + lesson
    + '/'
    + slugify(val.split('.')[0])
    + '.html';
}
