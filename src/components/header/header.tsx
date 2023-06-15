import { styles } from '../styles';
import React from 'react';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  count: number;
  price: number;
}

export function Header(props: IHeaderProps) {
  return (
    <header>
      <nav style={styles.header}>
        <Link className="navbar-brand" style={{ fontSize: '30px' }} to="/">
          Online store
        </Link>
        <p className="mx-4">Cart total: {props.price}$</p>
        <Link to="/cart">
          <button className="btn btn-outline-dark" type="submit">
            <i className="bi-cart-fill me-1"></i>
            Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">{props.count}</span>
          </button>
        </Link>
      </nav>
    </header>
  );
}
