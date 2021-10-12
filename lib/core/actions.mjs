import {promisify} from "util";
import downloadRepo from "download-git-repo";
import {vueRepo} from "../config.mjs";
import {execCommand, getTemplatePath, makeDirectory} from "../utils.mjs";
import {fileURLToPath} from "url";

import path from "path";
import fs from "fs";

import {renderFile as _renderFile} from "ejs";
import {program} from "commander";
const renderFile = promisify(_renderFile)


const download = promisify(downloadRepo)


export async function createAction(project) {
  await download(vueRepo, project, {clone: true})
  let npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await execCommand(npmCommand, ['install'], {cwd: project})
  await execCommand(npmCommand, ['run', 'serve'], {cwd: project})
}

export async function addComponentAction(name, dest) {
  const result = await renderFile(getTemplatePath('vue-component.ejs'), {data: {name, lowerName: name.toLowerCase()}})
  if (!fs.existsSync(dest))
    makeDirectory(dest)
  await fs.promises.writeFile(path.resolve(dest, `${name}.vue`), result)
}

export async function addPageAction(name, dest) {
  const componentResult = await renderFile(getTemplatePath('vue-component.ejs'), {data: {name, lowerName: name.toLowerCase()}})
  const routerResult = await renderFile(getTemplatePath('vue-router.ejs'), {data: {name, lowerName: name.toLowerCase()}})
  const targetPath = path.resolve(dest,name);
  if (!fs.existsSync(targetPath))
    makeDirectory(targetPath)
  fs.promises.writeFile(path.resolve(targetPath, `${name}.vue`), componentResult)
  fs.promises.writeFile(path.resolve(targetPath, `router.js`), routerResult)
}


export async function addStoreAction(name, dest) {
  const storeResult = await renderFile(getTemplatePath('vue-store.ejs'))
  const typeResult = await renderFile(getTemplatePath('vue-types.ejs'))
  const targetPath = path.resolve(dest,name);
  if (!fs.existsSync(targetPath))
    makeDirectory(targetPath)
  fs.promises.writeFile(path.resolve(targetPath, `${name}.js`), storeResult)
  fs.promises.writeFile(path.resolve(targetPath, `types.js`), typeResult)
}
