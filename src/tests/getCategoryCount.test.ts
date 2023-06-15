import { getCategoryCount } from '../components/Store/helper';
import { describe, expect, test } from '@jest/globals';
import Data from '../Assets/products.json';

describe('getCategoryCount from Data', () => {
  test('gets total amount of different products of a given category in Data', () => {
    expect(getCategoryCount(Data.products, 'laptops')).toBe(5);
  });
  test('gets total amount of different products of an absent category in Data', () => {
    expect(getCategoryCount(Data.products, 'bicycle')).toBe(0);
  });
});
