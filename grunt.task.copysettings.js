'use strict'

module.exports = (grunt) => {
  const isWindows = process.platform === 'win32'
  const path = require('path')

  grunt.registerMultiTask('copysettings', 'Copy selected settings to a new location', function () {
    const unixifyPath = (filepath) => {
      if (isWindows) {
        return filepath.toString().replace(/\\/g, '/')
      } else {
        return filepath.toString()
      }
    }
    // We only process the first file
    const filePair = this.files[0]
    const isExpandedPair = filePair.orig.expand || false
    const infile = unixifyPath(filePair.src)
    let outfile = unixifyPath(filePair.dest)
    if (!isExpandedPair) outfile = path.join(outfile, infile)
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
