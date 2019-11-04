import {flattenInputToString} from '../utils';
import mocks from './mocks';

describe('flattenInput', () => {
  it('should flatten and insert correct separator', () => {
    mocks.forEach(json => {
      expect(flattenInputToString(json, '-')).toMatchSnapshot();
      expect(flattenInputToString(json, '_')).toMatchSnapshot();
    });
  });
});
