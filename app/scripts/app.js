'use strict'

const electron = require('electron')
const shell = electron.shell
const ipc = electron.ipcRenderer

angular // eslint-disable-line
  .module('xkcdViewerApp', [])
  .controller('MainController', ['$scope', '$http', '$anchorScroll', ($scope, $http, $anchorScroll) => {
    const loadComic = (n) => {
      $scope.error = 'Loading...'
      $scope.imageInfo = {}
      const url = getUrl(n)
      $http.get(url)
      .then((data) => {
        // console.log(data)
        const imageInfo = data.data
        if (n === 0) $scope.latestComicNum = imageInfo.num
        $scope.imageInfo = imageInfo
        imageInfo.date = new Date(imageInfo.year, imageInfo.month - 1, imageInfo.day)
        $scope.error = null
        $scope.showingFirstComic = imageInfo.num === 1
        $scope.showingLastComic = imageInfo.num === $scope.latestComicNum
      })
      .catch(() => {
        $scope.error = 'Error getting comic.'
        $scope.showingFirstComic = $scope.showingLastComic = false
      })
      $anchorScroll('menu')
    }
    const getUrl = (n) => {
      const folder = n > 0 ? (n + '/') : ''
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
        loadComic(0)
      }
    }
    $scope.loadRandomComic = (event) => {
      event && event.preventDefault()
      loadComic(Math.floor((Math.random() * $scope.latestComicNum) + 1))
    }
    $scope.loadComic = (event, n) => {
      event && event.preventDefault()
      if (n < 1) $scope.loadFirstComic()
      else if (n > $scope.latestComicNum) $scope.loadLastComic()
      else loadComic(n)
    }
    $scope.gotoXkcd = (event, home) => {
      event && event.preventDefault()
      const url = `https://xkcd.com/${home ? '' : $scope.imageInfo.num}`
      shell.openExternal(url)
    }
    $scope.showAbout = (event) => {
      event && event.preventDefault()
      ipc.send('show-about')
    }
    $scope.showLicense = (event) => {
      event && event.preventDefault()
      ipc.send('show-license')
    }
    $scope.exitApp = (event) => {
      event && event.preventDefault()
      ipc.send('exit-app')
    }
    // Load the latest comic to start
    loadComic(0)
  }])
