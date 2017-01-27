/* eslint no-unused-vars: "off"*/

/**
 * An inverted index class.
 * @class
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    // stores all created index
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
    // remove multile words
    return tokens.filter((item, index) =>
      tokens.indexOf(item) === index);
  }

  /**
   * A method to create index
   * @param {Object} fileName
   * @param {Object} docToIndex
   * @returns {Object} Returns object containing index
   */
  createIndex(fileName, docToIndex) {
    // this object stores the index of the current document
    const newindex = {};
    // hole the combinations of document title and text
    const wordsToIndex = [];
    docToIndex.forEach((document) => {
      wordsToIndex
        .push(`${document.title.toLowerCase()} ${document.text
           .toLowerCase()}`);
    });
    const uniqueContent = InvertedIndex.distinctWords(wordsToIndex.join(' '));
    uniqueContent.forEach((word) => {
      newindex[word] = [];

      wordsToIndex.forEach((doc, indexPosition) => {
        if (doc.indexOf(word) > -1) {
          newindex[word].push(indexPosition);
        }
      });
    });
    this.index[fileName] = newindex;
    return this.index;
  }

  /**
   * A method
   * @param {String} fileName
   *@returns {Object} Returns object of an index of createIndex
   */
  getIndex(fileName) {
    if (fileName === undefined) {
      return this.index;
    }
    return this.index[fileName];
  }

  /**
   * Search index method
   * @param {String} query
   * @param {String} fileName term(s) to search for
   * @returns {Object} Returns result of searched index.
   */
  searchIndex(query, fileName) {
    fileName = fileName || Object.keys(this.index);
    this.searchResult = {};
    this.searchTerms = query.toLowerCase().match(/\w+/g);
    fileName.forEach((current) => {
      this.searchResult[current] = {};
      this.searchTerms.forEach((term) => {
        if (term in this.index[current]) {
          this.searchResult[current][term] = this.index[current][term];
        } else {
          this.searchResult[current][term] = this.index[current][term];
        }
      });
    });
    return this.searchResult;
  }

  /**
   * A method to validate json file
   * @param {String} file
   * @returns {Array} Returns boolean and a message.
   */
  validateFile(file) {
    if (typeof file !== 'object' || file.length === 0) {
      return [false, 'File is empty upload please a new file'];
    }

    try {
      this.jsonFile = file;
      let check = true;
      this.jsonFile.forEach((key) => {
        if (key.title === undefined || key.text === undefined) {
          check = false;
        }
      });
      if (!check) {
        const error = new Error('Invalid Content');
        throw error;
      }
      return [true, 'File Uploaded Successfully'];
    } catch (error) {
      return [false, 'Invalid File Content'];
    }
  }
}
