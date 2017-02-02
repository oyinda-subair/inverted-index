/* eslint no-unused-vars: "off"*/
/* eslint class-methods-use-this: "off"*/

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
   * @param {String} words
   * @returns {String} Returns array
   */
  static tokenize(words) {
    // exclude start and end white-space
    return words.trim().replace(/[^a-zA-Z 0-9]+/g, '').split(/\s/);
  }

  /**
   * A method to filter for unique words
   * @param {String} words
   * @returns {String} Returns array
   */
  static distinctWords(words) {
    const tokens = InvertedIndex.tokenize(words);
    // remove multiple words
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
    const newIndex = {};
    const wordsToIndex = [];

    docToIndex.forEach((document) => {
      wordsToIndex
        .push(`${document.title.toLowerCase()} ${document.text
           .toLowerCase()}`);
    });

    const uniqueContent = InvertedIndex.distinctWords(wordsToIndex.join(' '));

    uniqueContent.forEach((word) => {
      newIndex[word] = [];

      wordsToIndex.forEach((doc, indexPosition) => {
        if (doc.indexOf(word) > -1) {
          newIndex[word].push(indexPosition);
        }
      });
    });
    this.index[fileName] = newIndex;
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
    const searchResult = {};
    const searchTerms = query.toLowerCase().match(/\w+/g);
    fileName.forEach((current) => {
      searchResult[current] = {};
      searchTerms.forEach((term) => {
        if (term in this.index[current]) {
          searchResult[current][term] = this.index[current][term];
        }
      });
    });
    return searchResult;
  }

  /**
   * validateFile a method to validate json file
   * @param {Object} file
   * @returns {Object} Returns boolean and a message.
   */
  validateFile(file) {
    const jsonFile = file;
    let check = true;

    try {
      if (file === '' || typeof file !== 'object' || file.length === 0) {
        return { status: false, msg: 'File is empty please upload a new file' };
      }
      jsonFile.forEach((key) => {
        if (key.title === undefined || key.text === undefined) {
          check = false;
        }
      });

      if (!check) {
        throw new Error('Invalid File Content');
      }
      return { status: true, msg: 'File Uploaded Successfully' };
    } catch (error) {
      return { status: false, msg: 'Invalid File Content' };
    }
  }
}
