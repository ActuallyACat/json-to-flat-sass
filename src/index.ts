#!/usr/bin/env node
import * as glob from 'glob';
import * as yargs from 'yargs';
import { jsonToFlatSass } from './utils';
import * as path from 'path';

const version = require('../package.json').version;

const argv = yargs
  .usage('Usage: json-to-flat-sass <source> [<destination> --separator <separator> --extension <extension> ...]')
  .help('help').alias('help', 'h')
  .version('version', version).alias('version', 'v')
  .options({
    separator: {type: 'string', default: '-'},
    extension: {type: 'string', default: 'scss'}
  })
  .argv;
  
const source = argv._[0];
const destination = argv._[1];
const { extension, separator } = argv;
if (argv._.length === 0) { 
  console.log('Error - Source path missing\n');
  yargs.showHelp();
  process.exit();
}

const sourceDirectory = path.resolve(process.cwd(), source);
const sourceDirectoryList = glob.sync(sourceDirectory);

const destinationDirectory = path.resolve(process.cwd(), destination);

sourceDirectoryList.forEach((currentPath) => {
  const { name } = path.parse(currentPath);

  jsonToFlatSass({
    source: currentPath,
    destination: `${path.resolve(destinationDirectory, name)}.${extension}`,
    separator
  });
});
