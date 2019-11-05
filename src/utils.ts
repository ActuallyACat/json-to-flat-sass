#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { promises } from 'dns';

// Inspired by: https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
export default function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

const readFilePromise = (filename: string) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  })
}

const writeFilePromise = (filename: string, content: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, content, (err) => {
      if (err) reject(err);
      resolve();
    })
  })
}

export const jsonToFlatSass = async ({
  source,
  destination,
  separator
}: {
  source: string;
  destination: string;
  separator: string;
}) => {
  let flattenedInput = '', err: null | Error, fileData: null;

  [err, fileData] = await to(readFilePromise(source));
  if (!fileData) { 
    throw new Error('Error reading source file');
  }
  const parsedString = JSON.parse(fileData);
  flattenedInput = flattenInputToString(parsedString, separator);
  const { dir } = path.parse(destination);
  await fs.mkdir(dir, { recursive: true }, () => { 
    // an error here means dir is a path. Fine to squash 
  });
  [err] = await to(writeFilePromise(destination, flattenedInput));
  if (err) { 
    throw new Error ('Error writing to destination file');
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
