import { describe, expect, test } from '@jest/globals';
import { DataCategory } from '../components/Store/helper';

describe('Category', () => {
  test('check category from Data', () => {
    expect(DataCategory).toEqual([
      'smartphones',
      'laptops',
      'fragrances',
      'skincare',
      'groceries',
      'home-decoration',
      'furniture',
      'tops',
      'womens-dresses',
      'womens-shoes',
      'mens-shirts',
      'mens-shoes',
      'mens-watches',
      'womens-watches',
      'womens-bags',
      'womens-jewellery',
      'sunglasses',
      'automotive',
      'motorcycle',
      'lighting',
    ]);
  });
});
