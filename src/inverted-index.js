/**
 * An inverted index class.
 * @class
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.index = {};
  }

  /**
   * A token method
   * @param {Array} words
   * @returns {Array} Returns array
   */
  static tokenize(words) {
    // exclude start and end white-space
    return words.trim().replace(/[^a-zA-Z 0-9]+/g, '').split(/\s/);
  }

  /**
   * A method to filter for unique words
   * @param {Array} words
   * @returns {Array} Returns array
   */
  static distinctWords(words) {
    const tokens = InvertedIndex.tokenize(words);
    return tokens.filter((item, index) =>
      tokens.indexOf(item) === index);
  }

  /**
   * A method to create index
   * @param {Object} filePath
   * @returns {Object} Returns object containing index
   */
  createIndex(filePath) {
    const wordsToIndex = [];
    filePath.forEach((doc) => {
      if (doc.text) {
        wordsToIndex
          .push(`${doc.title.toLowerCase()} ${doc.text
           .toLowerCase()}`);
      }
    });
    const uniqueContent = InvertedIndex.distinctWords(wordsToIndex.join(' '));
    uniqueContent.forEach((word) => {
      this.index[word] = [];
      wordsToIndex.forEach((document, indexPosition) => {
        if (document.indexOf(word) > -1) {
          this.index[word].push(indexPosition);
        }
      });
    });
    return this.index;
  }

  /**
   * A method
   *@returns {Object} Returns object of  an index of createIndex
   */
  getIndex() {
    return this.index;
  }

  /**
   * A method to validate json file
   * @param {String} file
   * @returns {Array} Returns boolean and a message.
   */

  validateFile(file) {
    if (typeof file !== 'object' || file.length === 0) {
      return [false, 'Empty Json File, please upload a new file'];
    }

    try {
      this.jsonFile = file;
      let check = true;
      file.forEach((key) => {
        if (key.title !== undefined && file.text !== undefined) {
          check = false;
        }
        if (key.title === undefined && file.text === undefined) {
          check = false;
        }
      });
      if (!check) {
        return [false, 'Invalid File Content'];
      }
      return [true, 'Valid File'];
    } catch (err) {
      if (err instanceof SyntaxError) {
        return [false, 'syntax error'];
      }
      return [false, 'Invalid File Content'];
    }
  }
}
