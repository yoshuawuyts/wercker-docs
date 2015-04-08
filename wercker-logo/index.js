/**
 * Module dependencies.
 */

var fs = require('fs');

/**
 * Exports.
 */

module.exports = {
  base: fs.readFileSync(__dirname + '/logo-base.svg', 'utf8'),
  full: fs.readFileSync(__dirname + '/logo-full.svg', 'utf8')
};
