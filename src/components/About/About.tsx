import React, { useState, useEffect } from 'react';
import { GetProps, ItemForCart, ProductItem } from 'types';
import { Button } from '../button/button';
import { styles } from '../styles';
import data from '../../Assets/products.json';
import { addToCart, removeAllFromCart, setBackgroundImage, isInCart, SHADOW } from '../Store/helper';
import Data from '../../Assets/products.json';
import { Link } from 'react-router-dom';

export function About(prop: { item: number; get: GetProps }) {
  const item = data.products.find((item) => item.id == prop.item) as ProductItem;
  const [whatToDo, setWhatToDo] = useState(isInCart(item.id) ? 'Drop From Cart' : 'Add To Cart');
  const [shadow, setShadow] = useState(isInCart(item.id) ? SHADOW : '');
  const [inCart, setInCart] = useState(isInCart(item.id));

  let items = [] as ItemForCart[];
  const cartItems = localStorage.getItem('cart');
  if (cartItems !== null) {
    items = JSON.parse(cartItems);
  }
  const [state, setState] = useState(items);
  const [count, setCount] = useState(state.reduce((sum, item) => sum + item.count, 0));
  const [price, setPrice] = useState(
    state.reduce((sum, item) => sum + item.count * Data.products.filter((prod) => prod.id === item.id)[0].price, 0)
  );

  const ToDo = (id: number): void => {
    inCart ? setState(removeAllFromCart(id)) : setState(addToCart(id));
    setInCart(!inCart);
  };

  useEffect(() => {
    inCart ? setShadow(SHADOW) : setShadow('');
    inCart ? setWhatToDo('Drop From Cart') : setWhatToDo('Add To Cart');
  }, [inCart]);

  useEffect(() => {
    setCount(state.reduce((sum, item) => sum + item.count, 0));
    setPrice(
      state.reduce((sum, item) => sum + item.count * Data.products.filter((prod) => prod.id === item.id)[0].price, 0)
    );
  }, [state]);

  useEffect(() => {
    prop.get(count, price);
  }, [count, price]);

  return (
    <>
      <div className="col mb-5">
        <div className="card h-100">
          <div className="card-body p-4">
            <div className="breadscrumbs">
              <span className="text-muted">STORE</span>
              {'>'}
              <span className="text-muted">{item.category}</span>
              {'>'}
              <span className="text-muted">{item.brand}</span>
              {'>'}
              <span className="text-muted">{item.title}</span>
            </div>
            <div className="text-center">
              {/*Product name*/}
              <h5 className="fw-bolder">{item.title}</h5>
              <div className="mainDescription" style={styles.mainDescription}>
                {/* Product images*/}
                <div className="imageDescription" style={styles.imageDescription}>
                  <div className="imagesBar" style={styles.imagesBar}>
                    {item.images.map((element, i) => (
                      <img
                        src={element}
                        key={i}
                        className="imageInBar"
                        onClick={() => setBackgroundImage(document.querySelector('.card-img-top'), item.images[i])}
                      ></img>
                    ))}
                  </div>
                  <div className="imgContainer">
                    <div className="card-img-top" style={{ backgroundImage: `url(${item.thumbnail})` }} />
                  </div>
                </div>

                {/* Product description*/}
                <div className="infoDescription" style={styles.infoDescription}>
                  <h5 className="fw-bolder">Description:</h5>
                  <span className="text-muted">{item.description}</span>
                  <h5 className="fw-bolder">Discount Percentage:</h5>
                  <span className="text-muted">{item.discountPercentage}</span>
                  <h5 className="fw-bolder">Rating:</h5>
                  <span className="text-muted">{item.rating}</span>
                  <h5 className="fw-bolder">Stock:</h5>
                  <span className="text-muted">{item.stock}</span>
                  <h5 className="fw-bolder">Brand:</h5>
                  <span className="text-muted">{item.brand}</span>
                  <h5 className="fw-bolder">Category:</h5>
                  <span className="text-muted">{item.category}</span>
                </div>

                <div className="priceAndActionDescription">
                  {/*Product price*/}
                  <div className="containerPrice" style={{ boxShadow: `${shadow}` }}>
                    <h5 className="fw-bolder price">${item.price}</h5>
                    <Button
                      text={whatToDo}
                      onclick={() => {
                        ToDo(item.id);
                      }}
                    />
                    <Link to="/cart/#buy">
                      <Button
                        text="BUY NOW"
                        onclick={() => {
                          if (!inCart) setState(addToCart(item.id));
                        }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
