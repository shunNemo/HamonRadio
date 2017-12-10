import recursiveReaddir from './recursiveReaddir'
import JSON5 from 'json5'
import fs from 'fs'
import path from 'path'

export default function PugData(rootpath) {
  let json = {}

  recursiveReaddir(rootpath, filepath => {
    const key = filepath.substr(rootpath.length + 1)

    fs.readFile(path.resolve(__dirname, `${filepath}/index.json`), 'utf8', (err, data) => {
      const p = new Promise ( resolve => {
        setTimeout(() => {
          resolve(JSON5.parse(data))
        }, 100)
      })

      p.then( obj => {
        json[key] = obj
      })
    })
  })

  return json
}