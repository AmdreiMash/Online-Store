import React, { useState, useEffect } from 'react';
import { ItemForCart } from 'types';
import CartItem from './CartItem';
import Data from '../../Assets/products.json';
import { getProductsForPage } from '../Store/helper';
import BuyNow from './BuyNow';

const layout = document.querySelector('.darkness') as HTMLElement;
const popUP = document.querySelector('.buy-now') as HTMLElement;
//if (layout) layout.addEventListener('click', closePopup);

export default function Cart() {
  let items = [] as ItemForCart[];
  const cartItems = localStorage.getItem('cart');
  if (cartItems !== null) {
    items = JSON.parse(cartItems);
  }
  console.log(items);

  const [state, setState] = useState(items);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [products, setProducts] = useState(getProductsForPage(items, page, limit));
  const [totalPages, setTotalPages] = useState(Math.round(state.length / limit));
  const [totalProducts, setTotalProducts] = useState(state.reduce((sum, item) => sum + item.count, 0));
  const [popUP, setPopUP] = useState(false);
  const decreasePage = () => {
    if (page > 1) setPage(page - 1);
  };

  const increasePage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const decreaseCount = (id: number) => {
    const curState = [...state];
    const index = curState.indexOf(curState.find((el) => el.id === id) as ItemForCart);
    curState[index].count -= 1;
    setState(curState);
  };

  const increaseCount = (id: number) => {
    const curState = [...state];
    const index = curState.indexOf(curState.find((el) => el.id === id) as ItemForCart);
    curState[index].count += 1;
    setState(curState);
  };

  const delFromItems = (id: number): void => {
    console.log(`delfrom: ${id}`);
    const curState = [...state];
    curState.splice(curState.indexOf(curState.find((el) => el.id === id) as ItemForCart), 1);
    setState(curState);
    console.log(state);
  };

  useEffect(() => {
    setProducts(getProductsForPage(state, page, limit));
    setTotalPages(state.length / limit);
    setTotalProducts(state.reduce((sum, item) => sum + item.count, 0));
    console.log(state);
  }, [page, limit, state]);

  return (
    <>
      <div className="cart-caption">
        <span className="fw-bolder">Products In Cart</span>

        <div className="page-leafer">
          <div className="limit fw-bolder">
            LIMIT:
            <input
              type="number"
              step="1"
              value={limit}
              min="1"
              onChange={(e) => setLimit((e.target.value as unknown) as number)}
            />
          </div>
          <div className="page-number fw-bolder">
            <button type="button" className="btn btn-primary" onClick={() => decreasePage()}>
              {' '}
              {'<'}{' '}
            </button>
            <label htmlFor="page-leafer">{page}</label>
            <button type="button" className="btn btn-primary" onClick={() => increasePage()}>
              {' '}
              {'>'}{' '}
            </button>
          </div>
        </div>
      </div>
      <div className="cart-main">
        <div className="cart-items">
          {products.map((item, i) => (
            <CartItem
              key={i}
              product={item.product}
              count={item.count}
              number={item.number}
              del={delFromItems}
              decCount={decreaseCount}
              incCount={increaseCount}
            />
          ))}
        </div>
        <div className="summary">
          <span className="fw-bolder">Summary</span>
          <div>Products: {totalProducts}</div>
          <div>
            Total:{' '}
            {state.reduce(
              (sum, item) => sum + item.count * Data.products.filter((prod) => prod.id === item.id)[0].price,
              0
            )}
          </div>
          <input type="text" className="promocode" placeholder="Enter promo code" />
          <button type="button" className="btn btn-success" onClick={() => setPopUP(true)}>
            BUY NOW
          </button>
        </div>
      </div>
      <BuyNow popUP={popUP} setPopUP={() => setPopUP(false)} />
    </>
  );
}
