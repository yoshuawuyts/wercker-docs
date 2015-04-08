/**
 * Module dependencies.
 */

var assert = require('assert');

/**
 * Expose `filter()`.
 */

module.exports = filter;

/**
 * Create a filter
 *
 * @param {Object} opts
 *   @prop {String} query
 *   @prop {String[]} fields
 * @return {Function}
 * @api public
 */

function filter(data, query) {

  if (!query) return data;

  // create regexp
  var regexps = createRegExps(query)
  var objKeys = Object.keys(data);

  // cast all values to array
  var vals = objKeys
    .map((key) => data[key])
    .map((val) => Array.isArray(val) ? val : [val]);

  // filter values in array
  var arr = vals.map((val) =>
    val.filter((inn) =>
      regexps.every((regexp) =>
        inn.match(regexp)
      )
    )
  );

  // prune empty values in object.
  var nw = {};
  arr.forEach((val, i) => {
    var objKey = objKeys[i];

    if (val.length) return nw[objKey] = val;

    var keyMatch = regexps
      .every((regexp) => objKey.match(regexp));

    if (keyMatch) nw[objKey] = objKey;
  });

  return nw;
};

/**
 * Create regexsp for query.
 *
 * @param {String} querytext
 * @return {RegExp[]}
 * @api private
 */

function createRegExps(qr) {
  assert(!qr || 'string' == typeof qr, 'queryText should be a string');

  qr = qr || '';

  var nlz = qr.trim().toLowerCase();

  var parts = nlz
    .split(/[\s\'']+/)
    .filter((s) => !!s)
    .filter((s, index) => index < 10);

  return parts.map((i) => new RegExp('\\b' + i, 'i'));
}
