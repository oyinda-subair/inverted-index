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
