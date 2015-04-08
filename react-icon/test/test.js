/**
 * Module dependencies.
 */

var should = require('should');
var icon = require('../index');
var react = require('react');

/**
 * Test.
 */

describe('react-icon', function() {
  it('should have a displayName', function() {
    icon.type.displayName.should.eql('icon');
  });

  it('should require propTypes', function() {
    var propTypes = icon.propTypes;
    propTypes.should.be.ok;
    propTypes.className.isRequired.should.be.of.type('function');
    propTypes.onClick.isRequired.should.be.of.type('function');
    propTypes.key.isRequired.should.be.of.type('function');
  });

  it('should extend a base className');
});
