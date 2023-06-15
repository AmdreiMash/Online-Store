import { styles } from '../styles';
import React, { useEffect, useState } from 'react';
import { GetProps, IsInputValid } from 'types';
import CardLogo from './CardLogo';
import ValidatedInput from './ValidatedInput';
import { Link, useNavigate } from 'react-router-dom';
import { removeAllFromCart } from '../Store/helper';

export default function BuyNow(props: { popUP: boolean; setPopUP: () => void; get: GetProps }) {
  const CARD_LENGTH = 16;
  const CVV_LENGTH = 3;
  const namePattern = new RegExp('^[a-zа-яё]{3,}(\\s+[a-zа-яё]{3,}){1,}$', 'i');
  const addressPattern = new RegExp('^[a-zа-яё]{5,}(\\s+[a-zа-яё]{5,}){2,}$', 'i');
  const phonePattern = /^\+[0-9]{9,}$/;
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [nameError, setNameError] = useState('error');
  const [phoneError, setPhoneError] = useState('error');
  const [addressError, setAddressError] = useState('error');
  const [emailError, setEmailError] = useState('error');
  const [cardError, setCardError] = useState('error');
  const [cvvError, setCvvError] = useState('error');
  const [validThruError, setValidThruError] = useState('error');
  const [formValid, setFormValid] = useState(false);
  const navigator = useNavigate();
  const [cardType, setCardType] = useState('0');

  function isValid(x: IsInputValid, t?: string): void {
    switch (Object.entries(x)[0][0]) {
      case 'name':
        setNameError(Object.entries(x)[0][1]);
        break;
      case 'phone':
        setPhoneError(Object.entries(x)[0][1]);
        break;
      case 'address':
        setAddressError(Object.entries(x)[0][1]);
        break;
      case 'email':
        setEmailError(Object.entries(x)[0][1]);
        break;
      case 'card':
        setCardError(Object.entries(x)[0][1]);
        break;
      case 'cvv':
        setCvvError(Object.entries(x)[0][1]);
        break;
      case 'valid':
        setValidThruError(Object.entries(x)[0][1]);
        break;
    }
    if (t !== undefined) setCardType(t);
  }

  const submitData = () => {
    alert('The order is accepted');
    removeAllFromCart();
    props.get(0, 0);
    setTimeout(() => {
      navigator('/');
    }, 3000);
  };

  useEffect(() => {
    if (nameError || phoneError || addressError || emailError || cardError || cvvError || validThruError)
      setFormValid(false);
    else setFormValid(true);
  }, [nameError, phoneError, addressError, emailError, cardError, cvvError, validThruError]);
  const displey = props.popUP ? 'block' : 'none';

  return (
    <div style={{ ...styles.popUPbackground, display: displey }}>
      <Link
        to="/cart"
        onClick={props.setPopUP}
        style={{ position: 'fixed', left: '0', top: '0', width: '100%', height: '100%' }}
      ></Link>
      <form className="buy-now">
        <div className="personal">
          <h5 className="fw-bolder caption">Personal details</h5>
          <ValidatedInput name="name" class="validated" placeholder="Name" pattern={namePattern} isValid={isValid} />
          <ValidatedInput
            name="phone"
            class="validated"
            placeholder="Phone number"
            pattern={phonePattern}
            isValid={isValid}
          />
          <ValidatedInput
            name="address"
            class="validated"
            placeholder="Delivery address"
            pattern={addressPattern}
            isValid={isValid}
          />
          <ValidatedInput
            name="email"
            class="validated"
            placeholder="E-mail"
            pattern={emailPattern}
            isValid={isValid}
          />
        </div>
        <div className="credit">
          <h5 className="fw-bolder caption">Credit card details</h5>
          <div className="card-number">
            <CardLogo cardType={cardType} />
            <ValidatedInput
              name="card"
              class="validated"
              placeholder="Card number"
              pattern={RegExp('^[0-9]{' + CARD_LENGTH + '}$')}
              isValid={isValid}
              length={CARD_LENGTH}
              isCardType
            />
          </div>
          <div className="card-info">
            <ValidatedInput
              name="valid"
              class="validated card-valid"
              placeholder="Valid Thru"
              // eslint-disable-next-line prettier/prettier, no-useless-escape
              pattern={RegExp('^[01][0-9]\/[0-9]{2}$')}
              isValid={isValid}
              length={CARD_LENGTH}
              label="VALID:"
              type="validThru"
            />
            <ValidatedInput
              name="cvv"
              class="validated card-cvv"
              placeholder="Code"
              pattern={RegExp('^[0-9]{' + CVV_LENGTH + '}$')}
              isValid={isValid}
              length={CVV_LENGTH}
              label="CVV:"
            />
          </div>
        </div>

        <button disabled={!formValid} type="button" className="btn btn-success confirm" onClick={submitData}>
          CONFIRM
        </button>
      </form>
    </div>
  );
}
