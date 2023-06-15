import Cart from '../components/Cart/Cart';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

import React from 'react';
import { IHeaderProps } from 'types';

function CartPage(total: IHeaderProps) {
  return (
    <>
      <Header count={total.count} price={total.price} />
      <Cart get={total.get} />
      <Footer />
    </>
  );
}

export default CartPage;
