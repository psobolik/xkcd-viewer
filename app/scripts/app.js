'use strict'

angular // eslint-disable-line
  .module('xkcdViewerApp', [])
  .controller('MainController', ['$scope', '$http', ($scope, $http) => {
    var latestComic
    $scope.error = $scope.imageInfo = null
    var loadComic = (n) => {
      var url = getUrl(n)
      $http.get(url)
      .then((data) => {
        console.log(data)
        var imageInfo = data.data
        if (n === 0) latestComic = imageInfo
        $scope.imageInfo = imageInfo
        imageInfo.date = new Date(imageInfo.year, imageInfo.month - 1, imageInfo.day)
        $scope.error = null
        $scope.showingFirstComic = imageInfo.num === 1
        $scope.showingLastComic = imageInfo.num === latestComic.num
      })
      .catch((e) => {
        $scope.error = 'Error getting comic.'
      })
    }
    var getUrl = (n) => {
      let folder = n > 0 ? (n + '/') : ''
      return `https://xkcd.com/${folder}info.0.json`
    }
    $scope.loadFirstComic = (event) => {
      event && event.preventDefault()
      if (!$scope.showingFirstComic) {
        loadComic(1)
      }
    }
    $scope.loadPrevComic = (event) => {
      event && event.preventDefault()
      if (!$scope.showingFirstComic) {
        loadComic($scope.imageInfo.num - 1)
      }
    }
    $scope.loadNextComic = (event) => {
      event && event.preventDefault()
      if (!$scope.showingLastComic) {
        loadComic($scope.imageInfo.num + 1)
      }
    }
    $scope.loadLastComic = (event) => {
      event && event.preventDefault()
      if (!$scope.showingLastComic) {
        loadComic(latestComic.num)
      }
    }
    $scope.loadRandomComic = (event) => {
      event && event.preventDefault()
      loadComic(Math.floor((Math.random() * latestComic.num) + 1))
    }
    // Load the latest comic to start
    loadComic(0)
  }])
