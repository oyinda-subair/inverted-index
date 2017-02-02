const app = angular.module('myApp', ['toastr']);
app.controller('IndexController', ($scope, toastr) => {
  const invertedIndex = new InvertedIndex();
  $scope.documents = [];
  $scope.filenames = [];
  let details = {};
  $scope.indexedFile = [];
  $scope.checkedBox = [];
  $scope.showUploaded = false;
  $scope.showIndexTable = false;
  $scope.showSearch = false;
  $scope.uploadFile = () => {
    const files = document.getElementById('files').files;
    for (let il = 0; il < files.length; il += 1) {
      const file = files[il];
      if (/application\/json/.test(file.type)) {
        const reader = new FileReader();
        if ($scope.filenames.includes(file.name)) {
          toastr.error(`${file.name} has already been uploaded`, Error);
          return;
        }
        reader.readAsText(file);
        reader.onload = (e) => {
          const fileDetails = e.target.result;
          const validate = invertedIndex.validateFile(JSON.parse(fileDetails));
          const firstValue = validate.status;
          const secValue = validate.msg;
          if (!firstValue) {
            toastr.error(secValue, Error);
          } else {
            const jsonFile = JSON.parse(fileDetails);

            details = {
              name: file.name,
              docs: jsonFile
            };
            $scope.documents.push(details);
            $scope.filenames.push(details.name);
            $scope.showUploaded = true;
            $scope.showSearch = true;
            toastr.success(`${file.name} ${secValue}`, Error);
          }
        };
      } else {
        toastr.error('Invalid File Type', Error);
      }
    }
  };

  // create index click function.
  $scope.indexFile = () => {
    $scope.showIndexTable = true;
    const selectedFile = document.getElementById('uploadedFiles');
    const sFileIndex = selectedFile.selectedIndex;
    if (sFileIndex === -1) {
      toastr.error('Please upload a file');
    } else {
      const value = selectedFile[sFileIndex].value;
      $scope.file = $scope.documents[value];
      $scope.filename = $scope.file.name;
      $scope.docs = $scope.file.docs;
      invertedIndex.createIndex($scope.filename, $scope.docs);
      if (!$scope.indexedFile.includes($scope.filename)) {
        $scope.indexedFile.push($scope.filename);
      } else {
        toastr.error(`${$scope.filename} file has already been indexed`);
      }
    }
  };

  // get index of a specific file
  $scope.words = (filename) => {
    $scope.getty = invertedIndex.getIndex(filename);
    return $scope.getty;
  };

  // checkbox click function
  $scope.checked = (key) => {
    if ($scope.checkedBox.includes(key)) {
      $scope.checkedBox.splice($scope.checkedBox.indexOf(key), 1);
    } else {
      $scope.checkedBox.push(key);
    }
  };

  $scope.docsInFile = (filename) => {
    for (let xl = 0; xl <= $scope.documents.length; xl += 1) {
      if ($scope.documents[xl].name === filename) {
        return $scope.documents[xl].docs;
      }
    }
  };

  // search button click function
  $scope.searchIndex = () => {
    const checked = $scope.checkedBox.length;
    if (checked > 0) {
      $scope.searchResult =
        invertedIndex.searchIndex($scope.search, $scope.checkedBox);
    } else {
      $scope.searchResult = invertedIndex.searchIndex($scope.search);
    }
  };
});
