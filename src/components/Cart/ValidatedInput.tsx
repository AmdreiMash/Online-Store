import React, { useEffect, useState } from 'react';
import { IsInputValid } from 'types';

interface IValidatedInput {
  name: string;
  class: string;
  placeholder: string;
  pattern: RegExp;
  isValid: (x: IsInputValid, t?: string) => void;
  length?: number;
  label?: string;
  isCardType?: boolean;
  type?: string;
}

const ValidatedInput: React.FC<IValidatedInput> = (props: IValidatedInput) => {
  const [state, setState] = useState('');
  const [stateEdited, setStateEdited] = useState(false);
  const [stateError, setStateError] = useState('error');

  useEffect(() => {
    console.log(props.pattern);
    if (props.pattern.test(state)) {
      setStateError('');
      if (props.isCardType) props.isValid({ [props.name]: '' }, state[0]);
      else props.isValid({ [props.name]: '' });
    } else {
      setStateError(`invalid ${props.name}`);
      if (props.isCardType) props.isValid({ [props.name]: `invalid ${props.name}` }, state[0]);
      else props.isValid({ [props.name]: `invalid ${props.name}` });
    }
  }, [state]);

  const focusInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (props.name === 'phone') {
      if (e.target.value === '') setState('+');
    }
  };

  const inputThruHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value;
    let mas: Array<string> | undefined = [];
    switch (str.length) {
      case 0:
        setState('');
        break;
      case 1:
        if (str !== '0' && str !== '1' && str !== '/') setState('0' + str + '/');
        else setState(str);
        break;
      case 2:
        if (str[0] === '0') {
          if (str[1] === '0') setState('0');
          else if (str[1] !== '/') setState(str + '/');
          else setState(str);
        } else if (str[0] === '1')
          if (['0', '1', '2'].includes(str[1])) setState(str + '/');
          else setState('1');
        break;
      /*  case 3:
          if (Number(str[0]) >= 2) setState('0' + str.substring(1));
          break;*/
      default:
        if (Number(str[0]) >= 2) str = '1' + str.substring(1);
        str = str.replace(/[^0-9//]/, '');
        if (Number(str.substring(0, 2)) > 12) str = '12' + str.substring(2);
        else if (Number(str.substring(0, 2)) === 0) str = '01' + str.substring(2);
        mas = str.split('').filter((el) => el === '/');
        if (mas !== undefined && mas.length === 1) setState(str.substring(0, 5));
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.length === undefined) {
      let str = e.target.value;
      if (props.name === 'name') {
        str = str.replace(/[^a-zа-яё\s]/i, '');
      } else if (props.name === 'address') str = str.replace(/[^0-9a-zа-яё\s]/i, '');
      else if (props.name === 'phone') {
        if (str.length === 0) str = '+';
        else str = str.replace(/[^0-9+]/, '');
        if (str.length >= 1) str = '+' + str.substring(1).replace('+', '');
      }
      setState(str);
      if (!props.pattern.test(str)) {
        setStateError(`invalid ${props.name} `);
        // props.isValid(false);
      } else {
        setStateError('');
        // props.isValid(true);
      }
    } else {
      let num = e.target.value.replace(/\D/, '');
      if (num.length > props.length) {
        setState(num.slice(0, props.length));
        num = num.slice(0, props.length);
      } else setState(num);
      if (!props.pattern.test(num)) {
        setStateError(`invalid ${props.name} `);
        /*  if (props.isCardType) props.isValid(false, num[0]);
          else props.isValid(false);*/
      } else {
        setStateError('');
        /* if (props.isCardType) props.isValid(true, num[0]);
         else props.isValid(true);*/
      }
    }
  };
  const blurInput = () => {
    setStateEdited(true);
  };
  return (
    <div className="valid-input">
      {props.label && <label htmlFor="">{props.label}</label>}
      <div className="inputAndError">
        <input
          key={props.placeholder}
          value={state}
          onChange={(e) => {
            props.type !== 'validThru' ? inputHandler(e) : inputThruHandler(e);
          }}
          onBlur={(e) => blurInput()}
          onFocus={(e) => focusInput(e)}
          type="text"
          name={props.name}
          className={props.class}
          placeholder={props.placeholder}
        />
        {stateEdited && stateError && <span style={{ color: 'red', display: 'inline-block' }}>{stateError}</span>}
      </div>
    </div>
  );
};

export default ValidatedInput;
