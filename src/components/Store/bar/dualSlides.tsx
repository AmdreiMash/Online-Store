import React from 'react';
import Slider from '@mui/material/Slider';
import { SliderProps } from '../../../types/index';

function valuetext(value: number) {
  return `${value}`;
}

export default function RangeSlider(props: SliderProps) {
  const handleChange = (event: Event, newValue: number[] | number) => {
    //const newRange = { price: props.rangeValue.price, stock: props.rangeValue.stock };
    //if (props.valueLable === '$') {
    //  newRange.price = newValue;
    //} else newRange.stock = newValue;
    props.setRangeValue(event, props.valueLable, newValue);
  };

  const getValueLabelFormat = (value: number) => `${valuetext(value)}${props.valueLable}`;
  const value = props.valueLable === '$' ? props.rangeValue.price : props.rangeValue.stock;

  return (
    <Slider
      sx={{
        color: props.color,
      }}
      style={{ width: '80%' }}
      value={value}
      min={props.min}
      max={props.max}
      onChange={handleChange}
      valueLabelDisplay="auto"
      valueLabelFormat={getValueLabelFormat}
      getAriaValueText={valuetext}
      disableSwap
    />
  );
}
