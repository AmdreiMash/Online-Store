import React from 'react';
import { ProductItem } from 'types';
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { Button } from '../../button/button';
import { styles } from '../../styles';
import { getRankingProducts, addToCart } from '../helper';
import { Link } from 'react-router-dom';

export interface Products {
  products: ProductItem[];
  rank: string;
  setRank: (valye: string) => void;
}

export function ProdGrid(props: Products) {
  const products = getRankingProducts(props.products, props.rank);
  const handleChange = (event: SelectChangeEvent) => {
    props.setRank(event.target.value);
  };
  const ProductsGird = products.map((product: ProductItem) => {
    const img = product.thumbnail;
    return (
      <div key={(product.id as unknown) as string} style={styles.card}>
        <div
          style={{
            backgroundImage: `url('${img}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '50%',
          }}
        ></div>
        <div className="card-footer p-1 pt-0 border-top-0 bg-transparent">
          <div className="text">
            <div>
              <pre style={styles.cardText} className="fw-bolder">
                {product.title} <br />
                {product.brand} <br />
                {product.price}$ <br />
                Raiting: {product.rating}
              </pre>
            </div>
            <Button
              text="Add to Cart"
              onclick={() => {
                addToCart(product.id);
              }}
            />
            <Link to={`/about/${product.id}`}>
              <Button
                text="Product Description"
                onclick={function (): void {
                  1 + 1;
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  });

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
        <div>
          <Button onclick={() => console.log('colum')} text="Colum" />
          <Button onclick={() => console.log('row')} text="Row" />
        </div>
      </div>
      <div style={styles.productsGrid}>{ProductsGird}</div>
    </section>
  );
}
