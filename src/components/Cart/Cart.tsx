import React, { useState, useEffect } from 'react';
import { GetProps, ItemForCart } from 'types';
import CartItem from './CartItem';
import Data from '../../Assets/products.json';
import { getProductsForPage } from '../Store/helper';
import BuyNow from './BuyNow';
import { Semmery } from './Summary';
import { useSearchParams } from 'react-router-dom';

export default function Cart(props: { get: GetProps }) {
  let items = [] as ItemForCart[];
  const cartItems = localStorage.getItem('cart');
  if (cartItems !== null) {
    items = JSON.parse(cartItems);
  }

  const [searchParams, setSearchParams] = useSearchParams(new URL(window.location.href).search);
  const [state, setState] = useState(items);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 3);
  const [products, setProducts] = useState(getProductsForPage(items, page, limit));
  const [totalPages, setTotalPages] = useState(Math.round(state.length / limit));
  const [totalProducts, setTotalProducts] = useState(state.reduce((sum, item) => sum + item.count, 0));
  const [price, setPrice] = useState(
    state.reduce((sum, item) => sum + item.count * Data.products.filter((prod) => prod.id === item.id)[0].price, 0)
  );
  const [popUP, setPopUP] = useState(window.location.hash === '#buy');
  const decreasePage = () => {
    if (page > 1) {
      setPage(page - 1);
      setSearchParams({ limit: String(limit), page: String(page - 1) });
    }
  };

  const increasePage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setSearchParams({ limit: String(limit), page: String(page + 1) });
    }
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
    const curState = [...state];
    curState.splice(curState.indexOf(curState.find((el) => el.id === id) as ItemForCart), 1);
    setState(curState);
    if (curState.length % limit === 0 && page > 1) {
      setPage(page - 1);
      setSearchParams({ limit: String(limit), page: String(page - 1) });
    }
  };

  useEffect(() => {
    setProducts(getProductsForPage(state, page, limit));
    setTotalPages(state.length / limit);
    setTotalProducts(state.reduce((sum, item) => sum + item.count, 0));
    setPrice(
      state.reduce((sum, item) => sum + item.count * Data.products.filter((prod) => prod.id === item.id)[0].price, 0)
    );
  }, [page, limit, state]);

  useEffect(() => {
    props.get(totalProducts, price);
  }, [price, totalProducts]);

  if (items.length === 0) {
    return (
      <div style={{ height: '70vh' }} className="cart-caption">
        Is empty
      </div>
    );
  } else
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
                onChange={(e) => {
                  setLimit((e.target.value as unknown) as number);
                  setSearchParams({ page: String(page), limit: String(e.target.value) });
                }}
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
          <Semmery totalProducts={totalProducts} state={state} setPopUP={setPopUP} />
        </div>
        <BuyNow
          popUP={popUP}
          setPopUP={() => {
            setPopUP(false);
          }}
          get={props.get}
        />
      </>
    );
}
