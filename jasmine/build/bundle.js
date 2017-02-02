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
module.exports=""

},{}],4:[function(require,module,exports){
module.exports=[{
    "title": "Checkpoint one",
    "text": "Testing getIndex function"
  },

  {
    "title": "Checkpoint Two",
    "text": "Coming soon"
  }
]

},{}],5:[function(require,module,exports){
module.exports=[{
    "name": "my name is Oyindamola Subair",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "name": "my name is Omotola Subair",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],6:[function(require,module,exports){
const invertedIndex = new InvertedIndex();
const validBook = require('../books.json');
const emptyBook = require('../empty-book.json');
const invalidBook = require('../no-title-books.json');
const noContent = require('../empty.json');
const feedbackBook = require('../feedback.json');

invertedIndex.createIndex('books.json', validBook);
invertedIndex.createIndex('feedback.json', feedbackBook);

// this is test suite
describe('Read book data', () => {
  it('Should return false for empty json file', () => {
    expect(invertedIndex.validateFile(emptyBook).status).toEqual(false);
  });

  it('Should return true for valid json file', () => {
    expect(invertedIndex.validateFile(feedbackBook).status).toEqual(true);
  });

  it('Should return false if json does not contain title and text', () => {
    expect(invertedIndex.validateFile(invalidBook).status).toEqual(false);
  });

  const result = 'File is empty please upload a new file';
  it(`Should return ${result} for empty json file`, () => {
    expect(invertedIndex.validateFile(noContent).msg).toEqual(result);
  });
});

describe('Populate Index', () => {
  it('Should ensure that index is created once the file has been read', () => {
    expect(invertedIndex.getIndex('books.json', validBook)).toBeDefined();
  });

  it('Should maps the string keys to the correct object', () => {
    expect(invertedIndex.getIndex('feedback.json').checkpoint).toEqual([0, 1]);
  });

  it('Should return an object that is an accurate index of the json file',
    () => {
      expect(invertedIndex.getIndex('feedback.json')).toEqual({
        checkpoint: [0, 1],
        one: [0],
        testing: [0],
        getindex: [0],
        function: [0],
        two: [1],
        coming: [1],
        soon: [1]
      });
    });
});

describe('Search Index', () => {
  it('Should return correct index of the search term', () => {
    expect(invertedIndex.searchIndex('alice, a')).toEqual({
      'books.json': {
        alice: [0],
        a: [0, 1]
      },
      'feedback.json': {}
    });
  });

  it('Should return empty object when no result is found',
    () => {
      expect(invertedIndex.searchIndex('along',
        invertedIndex.getIndex()[0])).toEqual({
        'books.json': {},
        'feedback.json': {}
      });
    });

  it('Should return correct index in an array search terms', () => {
    expect(invertedIndex.searchIndex('checkpoint [one]')).toEqual({
      'books.json': {},
      'feedback.json': {
        checkpoint: [0, 1],
        one: [0]
      }
    });
  });
});

},{"../books.json":1,"../empty-book.json":2,"../empty.json":3,"../feedback.json":4,"../no-title-books.json":5}]},{},[6])