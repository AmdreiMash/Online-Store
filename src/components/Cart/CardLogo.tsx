import React from 'react';
import { cardLogoObject, getCardIndex } from './utils';

interface CardType<T> {
  cardType: T;
}
const CardLogo: React.FC<CardType<string>> = ({ cardType }) => {
  const cardIndex = getCardIndex(cardType);
  return (
    <div className="card-logo" style={{ backgroundImage: `url(${cardLogoObject[cardIndex as keyof object]})` }}></div>
  );
};
export default CardLogo;
