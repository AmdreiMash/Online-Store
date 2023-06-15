import { addToCart, removeFromCart } from '../Store/helper';
import React, { useState, useEffect } from 'react';
import { ICountChangerProps } from 'types';

export default function CountChanger({ product, count, number, del, decCount, incCount }: ICountChangerProps) {
  // const [state, setState] = useState({ count: count, stock: product.stock, total: count * product.price });
  // console.log('state: ', state);
  const [countOf, setCountOf] = useState(count);

  useEffect(() => {
    setCountOf(count);
  }, [count]);

  return (
    <>
      <div className="item-stock">Stock: {product.stock}</div>
      <div className="item-quantity">
        <div
          className="item-number number-down"
          onClick={() => {
            if (countOf > 1) {
              setCountOf(countOf - 1);
              decCount(product.id);
            } else {
              del(product.id);
            }
            removeFromCart(product.id);
          }}
        >
          -
        </div>
        <div className="item-howmany">{countOf}</div>
        <div
          className="item-number number-up"
          onClick={() => {
            if (countOf < product.stock) {
              setCountOf(countOf + 1);
              addToCart(product.id);
              incCount(product.id);
            }
          }}
        >
          +
        </div>
      </div>
      <div className="item-stock">${count * product.price}</div>
    </>
  );
}
