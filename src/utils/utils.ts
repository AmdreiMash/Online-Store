// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ProductItem } from '../types';
import data from '../Assets/products.json';

export const getCategoryCount = (data: ProductItem[], category: string): number => {
  return data.reduce((result, item) => {
    if (item.category === category) result++;
    return result;
  }, 0 as number);
};

export const getBrandCount = (data: ProductItem[], brand: string): number => {
  return data.reduce((result, item: ProductItem) => {
    if (item.brand === brand) result++;
    return result;
  }, 0);
};

export const getMin = (data: ProductItem[], property: string): number => {
  let result = 0;
  return data.reduce((min: number, prod: ProductItem) => {
    result = prod[property as keyof ProductItem] as number;
    if (result < min) return result;
    return min;
  }, 0);
};

export const getMax = (data: ProductItem[], property: string): number => {
  let result = 0;
  return data.reduce((max: number, prod: ProductItem) => {
    result = prod[property as keyof ProductItem] as number;
    if (result > max) return result;
    return max;
  }, 0);
};

export const isInputInProduct = (input: string, product: ProductItem) => {
  return (
    product.title.includes(input) ||
    product.description.includes(input) ||
    product.brand.includes(input) ||
    product.category.includes(input)
  );
};

export const DataCategory = data.products.reduce(
  (result: string[], x) => {
    if (result.indexOf(x.category) === -1) result.push(x.category);
    return result;
  },
  [data.products[0].category]
);

export const DataBrands = data.products.reduce(
  (result: string[], x) => {
    if (result.indexOf(x.brand) === -1) result.push(x.brand);
    return result;
  },
  [data.products[0].brand]
);

export type QyeryObj = {
  [category: string]: string[];
};
export function getFilters() {
  window.history.replaceState({}, '', window.location.href);
  const urlQuery = document.location.search.replace('?', '').split('&');
  const qyeryObj = {} as QyeryObj;
  if (urlQuery.length >= 0) {
    urlQuery.forEach((item: string) => {
      const keyAndValyes = item.split('=');
      qyeryObj[keyAndValyes[0]] = qyeryObj[keyAndValyes[1]];
    });
  }
  return qyeryObj;
}
