import fs from 'fs'
import path from 'path'
import junk from 'junk'

export default function recursiveReaddir(filepath, cb) {
  const list = fs.readdirSync(path.join(__dirname, filepath))

  list.filter(junk.not).forEach( dirs => {
    if (dirs.charAt(0) !== '_') {
      if (fs.statSync(path.join(__dirname, `${filepath}/${dirs}`)).isDirectory()) {
        recursiveReaddir(`${filepath}/${dirs}`, cb)
      } else {
        cb.call(this, filepath)
      }
    }
  })
}