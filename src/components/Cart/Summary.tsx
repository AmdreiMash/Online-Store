import React, { useState } from 'react';
import { ItemForCart } from '../../types/index';
import Data from '../../Assets/products.json';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export const Semmery = (props: {
  totalProducts: number;
  state: ItemForCart[];
  setPopUP: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [promo, setPromo] = useState(false);
  const [promoKey, setPromoKey] = useState('');
  const checkPromo = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (event.currentTarget.value === 'RSS') {
      setPromoKey('RSS -10%');
      setPromo(true);
    } else if (event.currentTarget.value === 'Store') {
      setPromoKey('Store -30%');
      setPromo(true);
    } else {
      setPromo(false);
    }
  };
  const [activKeys, setActivKeys] = useState({ keys: new Set<string>() });

  const getDiscount = () => {
    let discount = 0;
    if (activKeys.keys.has('RSS -10%')) discount += 0.1;
    if (activKeys.keys.has('Store -30%')) discount += 0.3;
    return discount;
  };

  const [discount, setDiscount] = useState(0);

  const keysBar = Array.from(activKeys.keys).map((key, index) => (
    <Button
      color="warning"
      key={index}
      onClick={() => {
        const currentKeys = activKeys.keys;
        currentKeys.delete(key);
        setActivKeys({ ...activKeys, keys: currentKeys });
        setDiscount(getDiscount());
      }}
    >
      {key}
    </Button>
  ));

  const shoPromo = promo ? 'block' : 'none';
  const decoration = activKeys.keys.size > 0 ? 'line-through' : 'none';
  const ShoVVkeysBar = activKeys.keys.size > 0 ? 'block' : 'none';
  return (
    <div className="summary">
      <span className="fw-bolder">Summary</span>
      <div>Products: {props.totalProducts}</div>
      <div style={{ textDecoration: decoration }}>
        Total:{' '}
        {props.state.reduce(
          (sum, item) => sum + item.count * Data.products.filter((prod) => prod.id === item.id)[0].price,
          0
        )}
      </div>
      <div
        style={{
          display: ShoVVkeysBar,
        }}
      >
        Total:{' '}
        {Math.ceil(
          props.state.reduce(
            (sum, item) => sum + item.count * Data.products.filter((prod) => prod.id === item.id)[0].price,
            0
          ) *
            (1 - discount)
        )}
        <div>{keysBar}</div>
      </div>
      <input onChange={(e) => checkPromo(e)} type="text" className="promocode" placeholder="Enter 'RSS' or 'Store'" />
      <div
        style={{
          display: shoPromo,
        }}
      >
        <Button
          onClick={() => {
            const key = activKeys.keys;
            key.add(promoKey);
            setActivKeys({ ...activKeys, keys: key });
            setDiscount(getDiscount());
          }}
        >
          {' '}
          add promo key {promoKey}
        </Button>
      </div>
      <Link to="/cart/#buy">
        <button type="button" className="btn btn-success" onClick={() => props.setPopUP(true)}>
          BUY NOW
        </button>
      </Link>
    </div>
  );
};
