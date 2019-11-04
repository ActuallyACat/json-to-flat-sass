const fsPromises = require('fs').promises; // using experimental API -> https://github.com/nodejs/node/issues/21014
import { flattenInputToString } from './utils';

export const processInput = async ({
  source,
  destination,
  separator = '-'
}: {
  source: string;
  destination?: string;
  separator?: string;
}) => {
  let flattenedInput = '';
  try {
    const sourceFile = await fsPromises.readFile(source, 'utf8');
    const parsedString = JSON.parse(sourceFile);
    flattenedInput = flattenInputToString(parsedString, separator);
  } catch (err) {
    console.error(err);
    return;
  }

  if (destination !== undefined) {
    await fsPromises.writeFile(destination, flattenedInput);
  } else { 
    console.log(flattenedInput);
  }
};

const cmd = process.argv.slice(2);
if (cmd.length > 1) {
  const [source, destination] = cmd;
  processInput({source, destination});
}
