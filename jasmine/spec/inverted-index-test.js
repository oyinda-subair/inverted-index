const invertedIndex = new InvertedIndex();
const validbook = require('../books.json');
const emptyBook = require('../empty-book.json');
const invalidBook = require('../no-title-books.json');

// this is test suite
describe('Read book data', () => {
  it('Should return false for empty json file', () => {
    expect(invertedIndex.validateFile(emptyBook)[0]).toEqual(false);
  });

  it('Should return true for valid json file', () => {
    expect(invertedIndex.validateFile(validbook)[0]).toEqual(true);
  });

  it('Should return false for wrong key json file', () => {
    expect(invertedIndex.validateFile(invalidBook)[0]).toEqual(false);
  });
});

describe('Populate Index', () => {
  it('Should ensure that index is created once the file has been read', () => {
    expect(invertedIndex.createIndex('books.json', validbook)).toBeDefined();
  });
  it('Should maps the string keys to the correct objects', () => {
    expect(invertedIndex.getIndex('books.json').alice).toEqual([0]);
  });
});

describe('Search Index', () => {
  it('Should return correct index of the search term', () => {
    expect(invertedIndex.searchIndex('alice, a')).toEqual({
      'books.json': {
        alice: [0],
        a: [0, 1]
      }
    });
  });
  it('Should return {} when no result is found', () => {
    expect(invertedIndex.searchIndex('along')).toEqual({});
  });
});
