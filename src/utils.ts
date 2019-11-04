import * as fs from 'fs';
import * as path from 'path';

const andThrow = (err: Error) => {
  console.error(err);
  throw err;
}

const andSquash = (err: Error) => {}

// NOTE: fs.promises are experimental API
// https://github.com/nodejs/node/issues/21014
export const jsonToFlatSass = async ({
  source,
  destination,
  separator
}: {
  source: string;
  destination?: string;
  separator: string;
}) => {
  let flattenedInput = '';
  try {
    const sourceFile = await fs.promises.readFile(source, 'utf8').catch(andThrow);
    const parsedString = JSON.parse(sourceFile);
    flattenedInput = flattenInputToString(parsedString, separator);
  } catch (err) {
    console.error(err);
    return;
  }
  
  if (destination !== undefined) {
    const { dir } = path.parse(destination);
    await fs.mkdir(dir, { recursive: true }, andSquash);
    await fs.promises.writeFile(destination, flattenedInput).catch(andThrow); 
  } else {
    console.log(flattenedInput);
  }
};

export const flattenInputToString = (
  jsonSource: object,
  separator: string,
): string => {
  let flatMap = '';

  const dive = (input: {[index: string]: any}, name: string): void => {
    if (typeof input !== 'object') {
      flatMap += `$${name}: '${input}';\n`;
      return;
    }
    Object.keys(input).forEach(key => {
      let concatName = name === '' ? key : `${name}${separator}${key}`;
      return dive(input[key], concatName);
    });
  };

  if (typeof jsonSource === 'object') {
    dive(jsonSource, '');
  }

  return flatMap;
};
