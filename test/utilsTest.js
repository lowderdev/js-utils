'use strict';

const { expect } = require('chai');
const { blank, present, presence } = require('../utils');

describe('Utils', function() {
  describe('present', function() {
    it('returns false for false', function() {
      expect(present(false)).to.be.false;
    });

    it('returns false for undefined', function() {
      expect(present(undefined)).to.be.false;
    });

    it('returns false for null', function() {
      expect(present(null)).to.be.false;
    });

    it('returns false for NaN', function() {
      expect(present(NaN)).to.be.false;
      expect(present(0 / 0)).to.be.false;
    });

    it('returns false for empty string', function() {
      expect(present('')).to.be.false;
    });

    it('returns false for blank string', function() {
      expect(present(' ')).to.be.false;
      expect(present('   ')).to.be.false;
      expect(present('\t')).to.be.false;
      expect(present('\r')).to.be.false;
      expect(present('\n')).to.be.false;
      expect(present('\v')).to.be.false;
      expect(present('\f')).to.be.false;
    });

    it('returns false for empty array', function() {
      expect(present([])).to.be.false;
    });

    it('returns false for empty object', function() {
      expect(present({})).to.be.false;
    });

    it('returns true for string with one or more non-whitespace characters', function() {
      expect(present('a')).to.be.true;
      expect(present('1')).to.be.true;
      expect(present('.')).to.be.true;
      expect(present('é')).to.be.true;
      expect(present('💩')).to.be.true;
      expect(present(' a 1 b 2 ')).to.be.true;
      expect(present('Live long and prosper')).to.be.true;
    });

    it('returns true for array with one or more value', function() {
      expect(present([1])).to.be.true;
      expect(present(['a'])).to.be.true;
      expect(present([{}])).to.be.true;
      expect(present([[]])).to.be.true;
      expect(present([true])).to.be.true;
      expect(present([false])).to.be.true;
      expect(present([0,1,2])).to.be.true;
      expect(present(["Qapla'!", 'Make it so...', 'KHHHHAAAAAAAAN!'])).to.be.true;
    });

    it('returns true for object with one or more key', function() {
      expect(present({ a: 1 })).to.be.true;
      expect(present({ "b": 2, 'c': 'tribble' })).to.be.true;
      expect(present({ a: {} })).to.be.true;
      expect(present({ b: [] })).to.be.true;
      expect(present({ c: true })).to.be.true;
      expect(present({ d: false })).to.be.true;
    });

    it('returns true for functions', function() {
      expect(present(() => {})).to.be.true;
      expect(present((a, b, c) => { return a + b + c})).to.be.true;
    });

    it('returns true for numbers', function() {
      expect(present(1)).to.be.true;
      expect(present(3.14159)).to.be.true;
      expect(present(Infinity)).to.be.true;
      expect(present(-Infinity)).to.be.true;
    });

    it('returns true for classes and instances', function() {
      class TestClass {
        constructor(arg) {
          this.arg = arg
        }

        foo() {
          return 'thing';
        }
      }
      expect(present(TestClass)).to.be.true;
      expect(present(new TestClass('baz'))).to.be.true;
    });

    it('returns true for dates', function() {
      expect(present(new Date('September 8, 1966'))).to.be.true;
      expect(present(new Date())).to.be.true;
      expect(present(new Date('Invalid date'))).to.be.true;
    });

    it('returns true for symbols', function() {
      expect(present(Symbol())).to.be.true;
      expect(present(Symbol('asdf'))).to.be.true;
    });

    it('returns true for regexp', function() {
      expect(present(new RegExp())).to.be.true;
      expect(present(new RegExp('\\w+'))).to.be.true;
    });
  });

  describe('blank', function() {
    it('returns the opposite of present', function() {
      expect(!blank(null)).to.equal(present(null));
      expect(!blank(undefined)).to.equal(present(undefined));
      expect(!blank('Enterprise')).to.equal(present('Enterprise'));
    });
  });

  describe('presence', function() {
    it('returns the value given if the value is present', function() {
      expect(presence('Q')).to.eql('Q');
      expect(presence([1, 2, 3])).to.eql([1, 2, 3]);
    });

    it('returns false if the value is blank', function() {
      expect(presence('')).to.be.false;
      expect(presence('  ')).to.be.false;
      expect(presence([])).to.be.false;
      expect(presence({})).to.be.false;
    });
  });
});
