import React, { useEffect, useState } from 'react';
import { Bar } from './bar/leftBar';
import { ProdGrid } from './grid/products';
import Data from '../../Assets/products.json';
import { ProductItem, RangeValye } from 'types';
import {
  getMin,
  getMax,
  addSearchParams,
  getDirectionAndRankParams,
  getStateParams,
  getRangeValueParams,
} from './helper';
import { useSearchParams } from 'react-router-dom';

export function StoreMain() {
  const [searchParams, setSearchParams] = useSearchParams(new URL(window.location.href).search);

  const [rangeValue, setRangeValue] = useState(getRangeValueParams(searchParams) as RangeValye);

  const [state, setState] = useState({
    ...getStateParams(searchParams),
    defaultRange: {
      price: [getMin(Data.products, 'price'), getMax(Data.products, 'price')],
      stock: [getMin(Data.products, 'stock'), getMax(Data.products, 'stock')],
    },
  });
  const [directionAndRank, setDirectionAndRank] = useState(getDirectionAndRankParams(searchParams));
  type TState = typeof state;
  const getProducts = (state: TState, rangeValue: RangeValye): ProductItem[] => {
    let products = Data.products;
    if (state.search !== '') {
      const search = state.search;
      products = products.filter((item) => {
        return (
          item.title.indexOf(search) !== -1 ||
          item.description.indexOf(search) !== -1 ||
          String(item.price).indexOf(search) !== -1 ||
          String(item.discountPercentage).indexOf(search) !== -1 ||
          String(item.rating).indexOf(search) !== -1 ||
          String(item.stock).indexOf(search) !== -1 ||
          item.brand.indexOf(search) !== -1 ||
          item.category.indexOf(search) !== -1
        );
      });
    } else products = Data.products;
    if (state.category.size > 0) products = products.filter((item) => state.category.has(item.category));
    if (state.brands.size > 0) products = products.filter((item) => state.brands.has(item.brand));
    if (Array.isArray(rangeValue.price) && Array.isArray(rangeValue.stock))
      products = products.filter(
        (item) =>
          (rangeValue.price as number[])[0] <= item.price &&
          item.price <= (rangeValue.price as number[])[1] &&
          (rangeValue.stock as number[])[0] <= item.stock &&
          item.stock <= (rangeValue.stock as number[])[1]
      );
    return products;
  };

  const drop = () => {
    setState({
      defaultRange: {
        price: [getMin(Data.products, 'price'), getMax(Data.products, 'price')],
        stock: [getMin(Data.products, 'stock'), getMax(Data.products, 'stock')],
      },
      category: new Set() as Set<string>,
      brands: new Set() as Set<string>,
      search: '',
    });
    setRangeValue({
      price: [getMin(Data.products, 'price'), getMax(Data.products, 'price')],
      stock: [getMin(Data.products, 'stock'), getMax(Data.products, 'stock')],
    } as RangeValye);
    setDirectionAndRank({ direction: '', rank: '' });
  };
  const [productItems, setProductItem] = useState(getProducts(state, rangeValue));
  //useEffect(() => {
  //  console.log('ставим продукты по фильтрам');
  //  const products = getProducts(false);
  //  setProductItem(products);
  //  setRangeValue({
  //    price: [getMin(products, 'price'), getMax(products, 'price')],
  //    stock: [getMin(products, 'stock'), getMax(products, 'stock')],
  //  } as RangeValye);
  //}, [state]);

  useEffect(() => {
    console.log('ставим продукты по ренжам');
    setProductItem(getProducts(state, rangeValue));
  }, [rangeValue]);

  useEffect(() => {
    console.log('изменение url');
    setSearchParams(addSearchParams(state, rangeValue, directionAndRank));
  }, [state, rangeValue, directionAndRank]);
  const slederColor = productItems.length ? '' : 'red';
  return (
    <main className="comtainer">
      <Bar
        slederColor={slederColor}
        setRangeValue={(value: RangeValye) => setRangeValue(value)}
        drop={drop}
        rangeValue={rangeValue}
        range={state.defaultRange}
        search={state.search}
        setSearch={(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
          const newState = { ...state, search: event.target.value };
          setState(newState);
          const products = getProducts(newState, newState.defaultRange);
          setRangeValue({
            price: [getMin(products, 'price'), getMax(products, 'price')],
            stock: [getMin(products, 'stock'), getMax(products, 'stock')],
          } as RangeValye);
          setProductItem(products);
        }}
        switchCategory={(e: React.MouseEvent<HTMLInputElement>) => {
          if (state.category.has(e.currentTarget.id)) {
            state.category.delete(e.currentTarget.id);
          } else {
            state.category.add(e.currentTarget.id);
          }
          const newState = { ...state, category: new Set(state.category) };
          setState(newState);
          const products = getProducts(newState, newState.defaultRange);
          setRangeValue({
            price: [getMin(products, 'price'), getMax(products, 'price')],
            stock: [getMin(products, 'stock'), getMax(products, 'stock')],
          } as RangeValye);
          setProductItem(products);
        }}
        brands={state.brands}
        category={state.category}
        switchBrands={(e: React.MouseEvent<HTMLInputElement>) => {
          if (state.brands.has(e.currentTarget.id)) {
            state.brands.delete(e.currentTarget.id);
          } else {
            state.brands.add(e.currentTarget.id);
          }
          const newState = { ...state, brands: new Set(state.brands) };
          setState(newState);
          const products = getProducts(newState, newState.defaultRange);
          setRangeValue({
            price: [getMin(products, 'price'), getMax(products, 'price')],
            stock: [getMin(products, 'stock'), getMax(products, 'stock')],
          } as RangeValye);
          setProductItem(products);
        }}
        ProductItems={productItems}
      />
      <ProdGrid
        products={productItems}
        rank={directionAndRank.rank}
        setRank={(value: string) => setDirectionAndRank({ ...directionAndRank, rank: value })}
        direction={directionAndRank.direction}
        setDirection={(value: string) => setDirectionAndRank({ ...directionAndRank, direction: value })}
      />
    </main>
  );
}
