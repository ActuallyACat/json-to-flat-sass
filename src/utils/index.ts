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
