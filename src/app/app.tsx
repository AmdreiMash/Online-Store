import React, { useState } from 'react';
import { StorePage } from '../Pages/StorePage';
import { DescriptionPage } from '../Pages/DescriptionPage';
import { Route, Routes } from 'react-router-dom';
import CartPage from '../Pages/CartPage';
import { Page404 } from '../Pages/Error';
import { GetProps, ItemForCart } from 'types';
import Data from '../Assets/products.json';

export const App = () => {
  let items = [] as ItemForCart[];
  const cartItems = localStorage.getItem('cart');
  if (cartItems !== null) {
    items = JSON.parse(cartItems);
  } else {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  const [price, setPrice] = useState(
    items.reduce((sum, item) => sum + item.count * Data.products.filter((prod) => prod.id === item.id)[0].price, 0)
  );
  const [count, setCount] = useState(items.reduce((sum, item) => sum + item.count, 0));

  const setTotal: GetProps = (count: number, price: number): void => {
    setCount(count);
    setPrice(price);
  };

  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="/about/:id" element={<DescriptionPage price={price} count={count} get={setTotal} />} />
      <Route path="/" element={<StorePage price={price} count={count} get={setTotal} />} />
      <Route path="/cart" element={<CartPage price={price} count={count} get={setTotal} />} />
    </Routes>
  );
};
