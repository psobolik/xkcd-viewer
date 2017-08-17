const path = require('path')
const fs = require('fs')

module.exports = (grunt) => {
  const getDest = (src, destPath) => {
    return path.join(destPath, path.basename(src))
  }
  const destExists = (src, destPath) => {
    const dest = getDest(src, destPath)
    return grunt.file.exists(dest)
  }
  return {
    srcIsNewer: (src, destPath) => {
      if (!destExists(src, destPath)) return true
      const dest = getDest(src, destPath)

      const srcModified = fs.statSync(src).mtime.getTime()
      const destModified = fs.statSync(dest).mtime.getTime()

      return srcModified > destModified
    },
    destExists: (src, destPath) => destExists(src, destPath)
  }
}
