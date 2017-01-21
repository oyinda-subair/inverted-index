(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[]

},{}],3:[function(require,module,exports){
module.exports=[{
    "name": "my name is Oyindamola Subair",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "name": "my name is Omotola Subair",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],4:[function(require,module,exports){
const invertedIndex = new InvertedIndex();
const validbook = require('../books.json');
const emptyBook = require('../empty-book.json');
const titleBook = require('../no-title-books.json');

// this is test suite
describe('Read book data', () => {
  it('Sould return false for empty json file', () => {
    expect(invertedIndex.validateFile(emptyBook)[0]).toEqual(false);
  });

  it('Sould return true for valid json file', () => {
    expect(invertedIndex.validateFile(validbook)[0]).toEqual(true);
  });

  it('Sould return false for wrong key json file', () => {
    expect(invertedIndex.validateFile(titleBook)[0]).toEqual(false);
  });
});

},{"../books.json":1,"../empty-book.json":2,"../no-title-books.json":3}]},{},[4])