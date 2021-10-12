import {spawn} from "child_process";
import path from "path";
import fs from "fs";

import {fileURLToPath} from "url";


export function execCommand(command, args, options) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, options)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', code => {
      resolve(code)
    })
    childProcess.on('error',err => {
      reject(err)
    })
  })

}

export function getTemplatePath(templateName) {
  const dirname = path.dirname(fileURLToPath(import.meta.url))
  return path.resolve(dirname, 'templates', templateName)
}

export function makeDirectory(filePath) {
  const dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
   makeDirectory(dirname)
  }
  fs.mkdirSync(filePath)

}