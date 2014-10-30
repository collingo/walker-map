'use strict';
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

//// SUT
var WalkerMap = require('../src/walker-map');

describe('WalkerMap', function() {

  var sandbox;
  var walkerMap;
  var callback;
  var tree;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    walkerMap = new WalkerMap();
    tree = {
      a: ['123', '456'],
      b: ['789', '012']
    };
    callback = sandbox.spy();
  });

  describe('params', function() {

    it('should be set', function() {
      expect(walkerMap.initialParams).to.deep.equal([[]]);
    });

  });

  describe('child', function() {

    beforeEach(function() {
      walkerMap.child(callback, tree, []);
    });

    it('should call the callback with the first property in the object', function() {
      expect(callback).to.have.been.calledWith(tree.a, ['a']);
    });

    it('should not call the callback with items in the array', function() {
      // SUT is stateful so we need to simulate walking the earlier parts of the tree
      walkerMap.child(callback, tree.a, ['a']);
      expect(callback).to.not.have.been.calledWith(tree.a[0]);
      expect(callback).to.not.have.been.calledWith(tree.a[1]);
    });

  });

  describe('sibling', function() {

    beforeEach(function() {
      // SUT is stateful so we need to simulate walking the earlier parts of the tree
      walkerMap.child(callback, tree, []);
      walkerMap.sibling(callback, tree.a, ['a']);
    });

    it('should call the callback with the next property in the object', function() {
      expect(callback).to.have.been.calledWith(tree.b, ['b']);
    });

  });

});