[![Build Status](https://travis-ci.org/andela-osubair/inverted-index.svg?branch=master)](https://travis-ci.org/andela-osubair/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-osubair/inverted-index/badge.svg?branch=master)](https://coveralls.io/github/andela-osubair/inverted-index?branch=master)
[![Code Climate](https://codeclimate.com/github/andela-osubair/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-osubair/inverted-index)
# Inverted Index

An application that creates an Index from a JSON array of one or more text objects , it is designed to allow very fast full-text searches.

## Features
  * Upload a JSON file in the format
  ```
  [
    {
      "title": "Alice in Wonderland",
      "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {
      "title": "The Lord of the Rings: The Fellowship of the Ring.",
      "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
  ]
  ```
  * Application allow for multiple upload
  * Index words
  * Search indexed words in file

## Usage
* The application can be access online [here](https://osubair-inverted-index.herokuapp.com/)

* It can be used locally by following the steps bellow:
  * Navigate to a directory of choice on `terminal`.
  * Clone this repository to your direcory
    > `https://github.com/andela-osubair/inverted-index.git`

  * Navigate to the repo's folder on your computer
    * `cd inverted-index`
  * Install the depenencies
    * `npm install`
  * To run test
    * `npm test`
  * Start application
    * `npm start`

## Dependencies
  * Gulp
  * Karma
  * Jasmine
  * TavisCI
  * HoundCI
  * Coveralls Code Coverage
  * Materialize CSS
  * AngularJS

## Limitations
  * Only files with `.json` extension can be indexed

## Contributions
  * Clone the repository.
  * Install depenencies
  * Create a new branch for included feature(s) using the keyword `feature/` example `feature/new-feature`.
  * Raise a pull request.