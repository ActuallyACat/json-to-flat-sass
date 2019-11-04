const fsPromises = require('fs').promises; // using experimental API -> https://github.com/nodejs/node/issues/21014

export const jsonToFlatSass = async ({
  source,
  destination,
  separator = '-',
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

export const flattenInputToString = (
  jsonSource: object,
  separator: string,
): string => {
  let flatMap = '';

  const dive = (input: {[index: string]: any}, name: string): void => {
    if (typeof input !== 'object') {
      flatMap += `$${name} = '${input}';\n`;
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
