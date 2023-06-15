import React from 'react';
import { GetProps, ProductItem } from 'types';
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { Button } from '../../button/button';
import { styles } from '../../styles';
import { getRankingProducts, getProductsDirection } from '../helper';
import { Product } from './product';

export interface Products {
  products: ProductItem[];
  rank: string;
  setRank: (valye: string) => void;
  direction: string;
  setDirection: (valye: string) => void;
  getForHeader: GetProps;
}

export function ProdGrid(props: Products) {
  const imgSize = props.direction === 'row' ? '40%' : '90%';
  const direction = getProductsDirection(props.direction);
  const products = getRankingProducts(props.products, props.rank);
  const handleChange = (event: SelectChangeEvent) => {
    props.setRank(event.target.value);
  };
  const ProductsGird = products.length ? (
    products.map((product: ProductItem) => (
      <Product
        key={product.id}
        product={product}
        imgSize={imgSize}
        direction={props.direction}
        get={props.getForHeader}
      />
    ))
  ) : (
    <div style={{ fontSize: '200%', margin: '10% auto' }}>NOT FOUND</div>
  );

  return (
    <section className="container w70" style={styles.preductsContainer}>
      <div className="products-header w100 p-1" style={styles.productsHeader}>
        <FormControl className="ranking-form" style={{ width: '30%', padding: '5px' }}>
          <InputLabel htmlFor="">Sort by</InputLabel>
          <Select
            native
            value={props.rank}
            onChange={handleChange}
            inputProps={{
              name: '',
              id: 'ranking-selekt',
            }}
          >
            <option aria-label="None" value="" />
            <option value={'raiting ASC'}>raiting ASC</option>
            <option value={'raiting DESC'}>raiting DESC</option>
            <option value={'price ASC'}>price ASC</option>
            <option value={'price DESC'}>price DESC</option>
          </Select>
        </FormControl>
        <p>Find {props.products.length}</p>
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button onclick={() => props.setDirection('column')} text="Colum" />
          <Button onclick={() => props.setDirection('row')} text="Row" />
        </div>
      </div>
      <div style={direction.container}>{ProductsGird}</div>
    </section>
  );
}
