// (function () {

// }());

const app = angular.module('myApp', []);
app.controller('IndexController', ($scope) => {
  const invertedIndex = new InvertedIndex();
  // $scope.files = [];
  $scope.documents = [];
  let details = {};
  $scope.indexedFile = [];
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
              // if (!$scope.indexedFile.includes(details.name)) {

              // }
              $scope.documents.push(details);
              $scope.indexShow = true;
              $scope.message = secValue;
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
      invertedIndex.createIndex($scope.docs);
      $scope.getty = invertedIndex.getIndex();
      $scope.words = $scope.getty;
      if (!$scope.indexedFile.includes($scope.filename.name)) {
        $scope.indexedFile.push($scope.filename);
      }
    }
  };
});
