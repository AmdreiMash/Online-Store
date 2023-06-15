import React from 'react';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { About } from '../components/About/About';
import { useParams } from 'react-router-dom';
import { IHeaderProps } from 'types';

export const DescriptionPage = (total: IHeaderProps) => {
  const { id } = useParams();
  const pID = (id as unknown) as number;
  return (
    <>
      <Header price={total.price} count={total.count} />
      <About item={pID} get={total.get} />
      <Footer />
    </>
  );
};
