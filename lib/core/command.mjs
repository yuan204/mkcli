import {program} from "commander";
import {addComponentAction, addPageAction, addStoreAction, createAction} from "./actions.mjs";


export default function () {
  program
    .command(' create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createAction)

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: gl addcpn HelloWorld [-d src/components]')
    .action(name => addComponentAction(name, program.opts().dest ||  'src/components'))

  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: gl addpage Home [-d src/pages]')
    .action(name => addPageAction(name, program.opts().dest ||  'src/pages'))

  program
    .command('addstore <store>')
    .description('add store, 例如: why addstore Home [-d src/store/modules]')
    .action(name => addStoreAction(name, program.opts().dest ||  'src/store/modules'))
}