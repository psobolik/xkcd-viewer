(() => {
  const { version, productName, copyright } = require('../../package.json')

  // noinspection SpellCheckingInspection
  angular // eslint-disable-line
    .module('xkcdViewerAbout', [])
    .controller('AboutController', ['$scope', ($scope) => {
      $scope.version = version
      $scope.productName = productName
      $scope.copyright = copyright
    }])
})()
