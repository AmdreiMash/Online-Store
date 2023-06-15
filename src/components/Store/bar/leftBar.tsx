import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { Button } from '../../button/button';
import { styles } from '../../styles';
import RangeSlider from './dualSlides';
import { DataBrands, DataCategory, getCategoryCount, getBrandCount } from '../helper';
import Data from '../../../Assets/products.json';
import { BarProps, Hendler } from '../../../types/index';

export function Bar(props: BarProps) {
  const checkBar = (
    categorys: string[],
    counter: typeof getCategoryCount,
    switcher: Hendler,
    state: Set<string> | Set<unknown>
  ) => {
    return categorys.map((category: string) => {
      const totaQuantity = counter(Data.products, category);
      const courentQuantity = counter(props.ProductItems, category);
      const disabled = courentQuantity === 0;
      const checked = state.has(category);
      return (
        <Form key={category}>
          <Form.Check
            checked={checked}
            isInvalid={disabled}
            inline
            onClick={(e) => switcher(e)}
            label={`${category} (${courentQuantity}/${totaQuantity})`}
            name="category"
            type="checkbox"
            id={category}
          />
        </Form>
      );
    });
  };
  const [copyText, setText] = useState('Copy link');
  return (
    <aside className="left-bar w-25 container">
      <Form.Group className="my-3" controlId="SerchForm">
        <Form.Control type="text" placeholder="Search" value={props.search} onChange={props.setSearch} />
        <Form.Text className="text-muted">Enter keywords to search in the catalog</Form.Text>
      </Form.Group>
      <div style={{ gap: '5px', display: 'flex' }}>
        <Button text="Reset filters" onclick={props.drop} />
        <Button
          text={copyText}
          onclick={() => {
            navigator.clipboard.writeText((window.location as unknown) as string);
            setText('Сopied!');
            setTimeout(() => setText('Copy link'), 500);
          }}
        />
      </div>
      <h4>Categories</h4>
      <Form.Group className="mb-3" controlId="Category" style={styles.checkboxConteiner}>
        {checkBar(DataCategory, getCategoryCount, props.switchCategory, props.category)}
      </Form.Group>
      <h4>Brands</h4>
      <Form.Group className="mb-3" controlId="Brend" style={styles.checkboxConteiner}>
        {checkBar(DataBrands, getBrandCount, props.switchBrands, props.brands)}
      </Form.Group>
      <h4>Price</h4>
      <RangeSlider
        color={props.sliderColor}
        valueLable="$"
        rangeValue={props.rangeValue}
        setRangeValue={props.setRangeValue}
        min={props.range.price[0]}
        max={props.range.price[1]}
      />
      <h4>Stock</h4>
      <RangeSlider
        color={props.sliderColor}
        valueLable=""
        rangeValue={props.rangeValue}
        setRangeValue={props.setRangeValue}
        min={props.range.stock[0]}
        max={props.range.stock[1]}
      />
    </aside>
  );
}
