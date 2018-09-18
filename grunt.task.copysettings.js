'use strict'

module.exports = function (grunt) {
  const isWindows = process.platform === 'win32'
  const path = require('path')

  grunt.registerMultiTask('copySettings', 'Copy selected settings to a new location', function () {
    const fixPath = function (filePath) {
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
      let options = this.options({
        fields: null,
        space: 2
      })
      const json = grunt.file.readJSON(infile)
      grunt.file.write(outfile, JSON.stringify(json, options.fields, options.space))
    }
  })
}
