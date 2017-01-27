const app = angular.module('myApp', []);
app.controller('IndexController', ($scope) => {
  const invertedIndex = new InvertedIndex();
  $scope.documents = [];
  let details = {};
  $scope.indexedFile = [];
  $scope.checkedBox = [];
  // $scope.searchResult = [];
  $scope.uploadFile = () => {
    const files = document.getElementById('files').files;
    for (let il = 0; il < files.length; il += 1) {
      const file = files[il];
      if (/application\/json/.test(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileDetails = e.target.result;
          const validate = invertedIndex.validateFile(JSON.parse(fileDetails));
          const firstValue = validate[0];
          const secValue = validate[1];
          if (!firstValue) {
            $scope.$apply(() => {
              $scope.message = secValue;
              $scope.showMessage = true;
            });
          } else {
            const jsonFile = JSON.parse(fileDetails);
            details = {
              name: file.name,
              docs: jsonFile
            };
            $scope.$apply(() => {
              if (!$scope.documents.includes(details.name)) {
                $scope.documents.push(details);
                $scope.indexShow = true;
                $scope.message = secValue;
              }
            });
          }
        };
        reader.readAsText(file);
      } else {
        $scope.message = 'Invalid File Type';
      }
    }
  };

  $scope.indexFile = () => {
    const selectedFile = document.getElementById('uploadedFiles');
    const sFileIndex = selectedFile.selectedIndex;
    if (sFileIndex === -1) {
      $scope.message = 'Please upload a file';
    } else {
      $scope.file = $scope.documents[sFileIndex - 1];
      $scope.filename = $scope.file.name;
      $scope.docs = $scope.file.docs;
      invertedIndex.createIndex($scope.filename, $scope.docs);
      $scope.getty = invertedIndex.getIndex($scope.filename);
      $scope.words = $scope.getty;
      if (!$scope.indexedFile.includes($scope.filename)) {
        $scope.indexedFile.push($scope.filename);
      }
      $scope.message = '';
    }
  };

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

  $scope.searchIndex = () => {
    console.log($scope.search);
    const checklength = $scope.checkedBox.length;
    if (checklength > 0) {
      $scope.searchResult =
        invertedIndex.searchIndex($scope.search, $scope.checkedBox);
    } else {
      $scope.searchResult = invertedIndex.searchIndex($scope.search);
    }
    // $scope.searchResult.push($scope.result);
    console.log($scope.searchResult);
  };
});
