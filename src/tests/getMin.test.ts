import { describe, expect, test } from '@jest/globals';
import { getMin } from '../components/Store/helper';
import Data from '../Assets/products.json';

describe('getMin function', () => {
  test('get min price from Data', () => {
    expect(getMin(Data.products, 'price')).toBe(10);
  });
});
