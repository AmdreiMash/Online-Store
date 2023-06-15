import React from 'react';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { StoreMain } from '../components/Store/Store';
import { IHeaderProps } from 'types';

export const StorePage = (total: IHeaderProps) => {
  return (
    <>
      <Header count={total.count} price={total.price} />
      <StoreMain get={total.get} />
      <Footer />
    </>
  );
};
export { StoreMain };
