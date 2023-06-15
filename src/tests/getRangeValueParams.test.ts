/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test } from '@jest/globals';
import { getRangeValueParams } from '../components/Store/helper';

describe('getMin function', () => {
  test('get min price from Data', () => {
    const url = new URL('http://localhost:8080/?category=skincare&price=12%2570&stock=54%25140').searchParams;
    expect(getRangeValueParams(url)).toEqual({
      price: [12, 70],
      stock: [54, 140],
    });
  });
});
