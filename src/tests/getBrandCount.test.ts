import { getBrandCount } from '../components/Store/helper';
import { describe, expect, test } from '@jest/globals';
import Data from '../Assets/products.json';

describe('getBrandCount from Data', () => {
  test('gets total amount of different products of given brand in Data', () => {
    expect(getBrandCount(Data.products, 'Apple')).toBe(3);
  });
  test('gets total amount of different products of absent brand in Data', () => {
    expect(getBrandCount(Data.products, 'Horizont')).toBe(0);
  });
});
