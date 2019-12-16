#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob = __importStar(require("glob"));
var yargs = __importStar(require("yargs"));
var utils_1 = require("./utils");
var path = __importStar(require("path"));
var version = require('../package.json').version;
var argv = yargs
    .usage('Usage: json-to-flat-sass <source> <destination> [--separator <separator> --extension <extension> ...]')
    .help('help')
    .alias('help', 'h')
    .version('version', version)
    .alias('version', 'v')
    .options({
    separator: { type: 'string', default: '-' },
    extension: { type: 'string', default: 'scss' },
}).argv;
var source = argv._[0];
var destination = argv._[1];
var extension = argv.extension, separator = argv.separator;
// just check the common extensions
var variablePrefix = '$';
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
var sourceDirectory = path.resolve(process.cwd(), source);
var sourceDirectoryList = glob.sync(sourceDirectory);
if (sourceDirectoryList.length === 0) {
    // Received a path to a file, not dir
    sourceDirectoryList = [sourceDirectory];
}
var destinationDirectory = path.resolve(process.cwd(), destination);
sourceDirectoryList.forEach(function (currentPath) {
    var name = path.parse(currentPath).name;
    try {
        utils_1.jsonToFlatSass({
            source: currentPath,
            destination: path.resolve(destinationDirectory, name) + "." + extension,
            separator: separator,
            variablePrefix: variablePrefix
        });
    }
    catch (err) {
        console.error(err);
    }
});
