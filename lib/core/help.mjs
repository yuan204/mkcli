import {program} from "commander";

export default function () {
  program
    .option('-w, --why', ' a why cli')
    .option('-d, --dest <dest>', 'a destination folder, 例如: -d /src/components')
    .option('-f, --framework <framework>', 'your framework')
}

