import { getCardIndex } from '../components/Cart/utils';
import { describe, expect, test } from '@jest/globals';

describe('getCardIndex', () => {
  test('gets index of input char', () => {
    expect(getCardIndex('4')).toBe('4');
  });
  test(`if input char less '3' or more than '5' returns '0'`, () => {
    expect(getCardIndex('8')).toBe('0');
  });
});
