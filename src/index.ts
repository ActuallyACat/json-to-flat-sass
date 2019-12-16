#!/usr/bin/env node
import * as glob from 'glob';
import * as yargs from 'yargs';
import {jsonToFlatSass} from './utils';
import * as path from 'path';

const version = require('../package.json').version;

const argv = yargs
  .usage(
    'Usage: json-to-flat-sass <source> <destination> [--separator <separator> --extension <extension> ...]',
  )
  .help('help')
  .alias('help', 'h')
  .version('version', version)
  .alias('version', 'v')
  .options({
    separator: {type: 'string', default: '-'},
    extension: {type: 'string', default: 'scss'},
  }).argv;

const source = argv._[0];
const destination = argv._[1];
const {extension, separator} = argv;

// just check the common extensions
let variablePrefix: '$' | '@' = '$';
switch (extension) {
  case 'less':
    variablePrefix = '@';
    break;
  case 'sass':
  case 'scss':
  default:
    variablePrefix = '$';
}

if (argv._.length < 2) {
  console.log('Error - Source path or destination missing\n');
  yargs.showHelp();
  process.exit();
}

const sourceDirectory = path.resolve(process.cwd(), source);
let sourceDirectoryList = glob.sync(sourceDirectory);
if (sourceDirectoryList.length === 0) {
  // Received a path to a file, not dir
  sourceDirectoryList = [sourceDirectory];
}
const destinationDirectory = path.resolve(process.cwd(), destination);

sourceDirectoryList.forEach(currentPath => {
  const {name} = path.parse(currentPath);

  try {
    jsonToFlatSass({
      source: currentPath,
      destination: `${path.resolve(destinationDirectory, name)}.${extension}`,
      separator, 
      variablePrefix
    });
  } catch (err) {
    console.error(err);
  }
});
