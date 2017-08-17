'use strict'

module.exports = function (grunt) {
  var isWindows = process.platform === 'win32'
  var path = require('path')

  grunt.registerMultiTask('copysettings', 'Copy selected settings to a new location', function () {
    var unixifyPath = function (filepath) {
      if (isWindows) {
        return filepath.toString().replace(/\\/g, '/')
      } else {
        return filepath
      }
    }
    // We only process the first file
    let filePair = this.files[0]
    let infile = unixifyPath(filePair.src)
    let outfile = unixifyPath(filePair.dest)
    let isExpandedPair = filePair.orig.expand || false
    outfile = isExpandedPair ? outfile : path.join(outfile, infile)
    if (grunt.file.isFile(infile)) {
      let options = this.options({
        fields: null,
        space: 2
      })
      const json = grunt.file.readJSON(infile)
      grunt.file.write(outfile, JSON.stringify(json, options.fields, options.space))
    }
  })
}
