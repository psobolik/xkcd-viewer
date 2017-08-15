module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'node_modules/angular/',
          src: ['angular.min.js'],
          dest: 'app/lib/scripts/'
        }, {
          expand: true,
          cwd: 'node_modules/bootstrap/dist/js/',
          src: ['bootstrap.min.js'],
          dest: 'app/lib/scripts/'
        }, {
          expand: true,
          cwd: 'node_modules/bootstrap/dist/fonts',
          src: ['*'],
          dest: 'app/lib/fonts/'
        }, {
          expand: true,
          cwd: 'node_modules/bootstrap/dist/css/',
          src: ['bootstrap.min.css'],
          dest: 'app/lib/css/'
        }, {
          expand: true,
          cwd: 'node_modules/jquery/dist/',
          src: ['jquery.min.js'],
          dest: 'app/lib/scripts/'
        }]
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['copy'])
}
