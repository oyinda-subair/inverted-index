// (function () {

// }());

const app = angular.module('myApp', []);
app.controller('IndexController', ($scope) => {
  const invertedIndex = new InvertedIndex();
  $scope.files = [];
  $scope.documents = [];
  let details = {};
  $scope.fileNames = [];
  $scope.indexShow = false;
  $scope.showMessage = false;
  $scope.uploadFile = () => {
    const files = document.getElementById('files').files;
    for (let il = 0; il < files.length; il += 1) {
      const file = files[il];
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
            if (!$scope.fileNames.includes(details.name)) {
              $scope.documents.push(details);
              $scope.indexShow = true;
              $scope.message = secValue;
            }
          });
        }
      };
      reader.readAsText(file);
    }
  };

  $scope.indexFile = (file) => {
    $scope.file = file.name;
    $scope.docs = file.docs;
    $scope.wordings = invertedIndex.createIndex(file.docs);
    $scope.getty = invertedIndex.getIndex();
    $scope.words = $scope.getty;
    $scope.indexShow = false;
  };
});
