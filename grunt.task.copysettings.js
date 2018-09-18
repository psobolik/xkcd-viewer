'use strict'

module.exports = (grunt) => {
  const isWindows = process.platform === 'win32'
  const path = require('path')

  grunt.registerMultiTask('copySettings', 'Copy selected settings to a new location', function () {
    var unixifyPath = function (filepath) {
      if (isWindows) {
        return filePath.toString().replace(/\\/g, '/')
      } else {
        return filePath
      }
    }
    // We only process the first file
    let filePair = this.files[0]
    let infile = fixPath(filePair.src)
    let outfile = fixPath(filePair.dest)
    let isExpandedPair = filePair.orig.expand || false
    outfile = isExpandedPair ? outfile : path.join(outfile, infile)
    if (grunt.file.isFile(infile)) {
      const options = this.options({
        fields: null,
        space: 2
      })
      const json = grunt.file.readJSON(infile)
      grunt.file.write(outfile, JSON.stringify(json, options.fields, options.space))
    }
  })
}
