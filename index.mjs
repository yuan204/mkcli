#!/usr/bin/env node --experimental-json-modules
import helpOptions from "./lib/core/help.mjs";
import createCommand from "./lib/core/command.mjs";
import {program} from "commander";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const packageJson = require('./package.json')

program.version(packageJson.version)
helpOptions()
createCommand()
program.parse(process.argv)