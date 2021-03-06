module.exports = (grunt) => {
  const ifNeeded = require('./grunt.ifNeeded')(grunt)
  require('./grunt.task.copySettings')(grunt)
  const config = {
    scriptLib: 'app/lib/scripts/',
    styleLib: 'app/lib/css/',
    fontLib: 'app/lib/fonts/',
    jqueryDist: 'node_modules/jquery/dist/',
    angularDist: 'node_modules/angular/',
    bootstrapDist: 'node_modules/bootstrap/dist/'
  }
  const scriptChanged = (target) => { return ifNeeded.srcIsNewer(target, config.scriptLib) }
  const fontChanged = (target) => { return ifNeeded.srcIsNewer(target, config.fontLib) }
  const styleChanged = (target) => { return ifNeeded.srcIsNewer(target, config.styleLib) }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copySettings: {
      options: {
        fields: ['productName', 'version', 'description', 'copyright']
      },
      build: {
        src: 'package.json',
        dest: 'app/'
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: config.jqueryDist,
          src: ['jquery.min.js'],
          dest: config.scriptLib,
          filter: scriptChanged
        }, {
          expand: true,
          cwd: config.angularDist,
          src: ['angular.min.js'],
          dest: config.scriptLib,
          filter: scriptChanged
        }, {
          expand: true,
          cwd: `${config.bootstrapDist}js/`,
          src: ['bootstrap.min.js'],
          dest: config.scriptLib,
          filter: scriptChanged
        }, {
          expand: true,
          cwd: `${config.bootstrapDist}fonts/`,
          src: ['*'],
          dest: config.fontLib,
          filter: fontChanged
        }, {
          expand: true,
          cwd: `${config.bootstrapDist}css/`,
          src: ['bootstrap.min.css'],
          dest: config.styleLib,
          filter: styleChanged
        }]
      }
    }
  })
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['copy', 'copySettings'])
}
