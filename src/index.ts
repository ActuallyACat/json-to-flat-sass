import {jsonToFlatSass} from './utils';

const cmd = process.argv.slice(2);

if (cmd.length === 0) { 
  console.log('Usage: json-to-flat-sass <input> <output> [<optional-separator>]')
  process.exit();
}

if (cmd.length > 1) {
  const [source, destination, separator] = cmd;
  jsonToFlatSass({
    source,
    destination,
    separator,
  });
}
