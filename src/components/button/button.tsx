import React from 'react';
import { IButtonProps } from '../../types/index';

export function Button(props: IButtonProps) {
  return (
    <button type="button" onClick={props.onclick} className="btn btn-primary">
      {props.text}
    </button>
  );
}
