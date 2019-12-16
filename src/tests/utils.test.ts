import {flattenInputToString} from '../utils';
import mocks from './mocks';

describe('flattenInput', () => {
  it('should flatten and insert correct separator for sass', () => {
    mocks.forEach(json => {
      expect(flattenInputToString(json, '-', '$')).toMatchSnapshot();
    });
  });

  it('should flatten and insert correct separator for less', () => {
    mocks.forEach(json => {
      expect(flattenInputToString(json, '-', '@')).toMatchSnapshot();
    });
  });
});
