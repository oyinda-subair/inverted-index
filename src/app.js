const app = angular.module('myApp', ['toastr']);
app.controller('IndexController', ($scope, toastr) => {
  const invertedIndex = new InvertedIndex();
  $scope.documents = [];
  $scope.fileNames = [];
  let details = {};
  $scope.indexedFile = [];
  $scope.checkedBox = [];
  $scope.showUploaded = false;
  $scope.showIndexTable = false;
  $scope.showSearch = false;
  $scope.uploadFile = () => {
    if ($scope.upload === undefined) {
      toastr.error(
        'Please browse for file(s) to upload then click upload button',
        'Error');
    }
    const files = document.getElementById('files').files;
    for (let il = 0; il < files.length; il += 1) {
      const file = files[il];
      if (/application\/json/.test(file.type)) {
        const reader = new FileReader();
        if ($scope.fileNames.includes(file.name)) {
          toastr.error(`${file.name} has already been uploaded`, 'Error');
          return;
        }
        reader.readAsText(file);
        reader.onload = (e) => {
          const fileDetails = e.target.result;
          const validate = invertedIndex.validateFile(JSON.parse(fileDetails));
          const firstValue = validate.status;
          const secValue = validate.msg;
          if (!firstValue) {
            toastr.error(secValue, 'Error');
          } else {
            const jsonFile = JSON.parse(fileDetails);

            details = {
              name: file.name,
              docs: jsonFile
            };
            $scope.documents.push(details);
            $scope.fileNames.push(details.name);
            $scope.showUploaded = true;
            $scope.showSearch = true;
            toastr.success(`${file.name} uploaded successfully`, 'Success');
          }
        };
      } else {
        toastr.error('Invalid File Type', 'Error');
      }
    }
  };

  // create index click function.
  $scope.indexFile = () => {
    $scope.showIndexTable = true;
    const selectedFile = document.getElementById('uploadedFiles');
    const sFileIndex = selectedFile.selectedIndex;
    if (sFileIndex === -1) {
      toastr.error('Please upload a file', 'Error');
    } else {
      const value = selectedFile[sFileIndex].value;
      $scope.file = $scope.documents[value];
      $scope.fileName = $scope.file.name;
      $scope.docs = $scope.file.docs;
      if (!$scope.indexedFile.includes($scope.fileName)) {
        invertedIndex.createIndex($scope.fileName, $scope.docs);
        $scope.indexedFile.push($scope.fileName);
      } else {
        toastr.error(
          `${$scope.fileName} file has already been indexed`, 'Error');
      }
    }
  };

  // get index of a specific file
  $scope.words = (file) => {
    $scope.getty = invertedIndex.getIndex(file);
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

  $scope.docsInFile = (fileName) => {
    for (let xl = 0; xl <= $scope.documents.length; xl += 1) {
      if ($scope.documents[xl].name === fileName) {
        return $scope.documents[xl].docs;
      }
    }
  };

  // search button click function
  $scope.searchIndex = () => {
    if ($scope.search === undefined) {
      toastr.error('Please enter a search term', 'Error');
      return;
    }
    if ($scope.search !== undefined && $scope.indexedFile.length === 0) {
      toastr.error('Please create index before searching', 'Error');
      return;
    }
    const checked = $scope.checkedBox.length;
    if (checked > 0) {
      $scope.searchResult =
        invertedIndex.searchIndex($scope.search, $scope.checkedBox);
    } else {
      $scope.searchResult = invertedIndex.searchIndex($scope.search);
    }
  };
});

app.directive('toggle', () => {
  return {
    restrict: 'A',
    link: (scope, element) => {
      $(element).addClass('active');
      $('.collapsible').collapsible({ accordion: false });
    }
  };
});
