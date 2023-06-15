import React from 'react';
import { ICountChangerProps, ProductItem } from 'types';
import CountChanger from './CountChanger';

export default function CartItem(props: ICountChangerProps) {
  const prod = props.product as ProductItem;

  return (
    <div className="cart-item">
      <div className="item-number">{props.number}</div>
      <div className="item-info">
        <div className="item-image" style={{ backgroundImage: `url(${prod.thumbnail})` }}></div>
        <div className="item-description">
          <h5 className="item-name fw-bolder">{prod.title}</h5>
          <div className="item-name">{prod.description}</div>
          <div className="item-params">
            <div>Rating: {prod.rating}</div>
            <div>Discount: {prod.discountPercentage}</div>
          </div>
        </div>
        <div className="item-count">
          <CountChanger
            product={prod}
            count={props.count}
            number={props.number}
            del={props.del}
            decCount={props.decCount}
            incCount={props.incCount}
          />
        </div>
      </div>
    </div>
  );
}
