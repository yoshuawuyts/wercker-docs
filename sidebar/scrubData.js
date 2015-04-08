module.exports = scrubData;

/**
 * Remove all non-`.md` files from the data set.
 * @param {Object} data
 */
function scrubData(data) {
  Object.keys(data).forEach(function(key) {
    var nwArr = [];
    data[key].forEach(function(val) {
      if (/^[\w-_]*\.md$/.test(val)) nwArr.push(val);
    });
    data[key] = nwArr;
  });
  return data;
}
