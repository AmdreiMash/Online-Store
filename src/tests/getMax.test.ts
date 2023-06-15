import { describe, expect, test } from '@jest/globals';
import { getMax } from '../components/Store/helper';
import Data from '../Assets/products.json';

describe('getMax function', () => {
  test('get max price frome Data', () => {
    expect(getMax(Data.products, 'price')).toBe(1749);
  });
});
